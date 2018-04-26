const router = require('express').Router();
const mongoose = require('mongoose');
const passport = require('passport');

const validatePostInput = require('../../validation/post');

// Load model
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

router.get('/test', (req, res) => {
	res.json({ msg: 'Posts works' });
});

router.get('/', (req, res) => {
	Post.find().sort({ date: -1 }).then(posts => res.json(posts)).catch(err => res.status(404).json({ nopostfound: 'No posts found' }));
});

router.get('/:id', (req, res) => {
	Post.findById(req.params.id).then(post => res.json(post)).catch(err => res.status(404).json({ nopostfound: 'No post found for this ID' }));
});

// @access Private
router.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
	// Check validation
	const { errors, isValid } = validatePostInput(req.body);
	if (!isValid) { return res.status(400).json(errors); }

	const newPost = new Post({
		text: req.body.text,
		name: req.body.name,
		avatar: req.body.avatar,
		user: req.user.id
	});

	newPost.save().then(post => res.json(post));
});

// @access Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
	const profile = await Profile.findOne({ user: req.user.id });
	try {
		const post = await Post.findById(req.params.id);
		// Check for post owner
		if (post.user.toString() !== req.user.id) {
			return res.status(401).json({ notauthorized: 'User not authorized' });
		}
		post.remove().then(() => res.json({ success: true }));
	}
	catch (err) {
		err => res.status(404).json({ postnotfound: 'No post found' })
	}
});


// @access Private
router.post('/like/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
	const profile = await Profile.findOne({ user: req.user.id });
	try {
		const post = await Post.findById(req.params.id);
		if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
			return res.status(400).json({ alreadyliked: 'User already liked this post' });
		}

		post.likes.unshift({ user: req.user.id });
		post.save().then(post => res.json(post));
	}
	catch (err) {
		err => res.status(404).json({ postnotfound: 'No post found' })
	}
});


// @access Private
router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
	const profile = await Profile.findOne({ user: req.user.id });
	try {
		const post = await Post.findById(req.params.id);
		if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
			return res.status(400).json({ notliked: 'You have not yet liked that post' });
		}

		// Get remove index
		const removeIndex = post.likes.map(item => item.user.toString()).indexOf(req.user.id);
		// Splice out of array
		post.likes.splice(removeIndex, 1);
		post.save().then(post => res.json(post));
	}
	catch (err) {
		err => res.status(404).json({ postnotfound: 'No post found' })
	}
});


router.post('/comments/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
	// Check validation
	const { errors, isValid } = validatePostInput(req.body);
	if (!isValid) { return res.status(400).json(errors); }

	const post = await Post.findById(req.params.id);
	const newComment = {
		text: req.body.text,
		name: req.body.name,
		avatar: req.body.avatar,
		user: req.user.id
	};

	post.comments.unshift(newComment);
	post.save().then(post => res.json(post))
			   .catch(err => res.status(404).json({ postnotfound: 'No post found '+err }));
});


router.delete('/comments/:id/:comment_id', passport.authenticate('jwt', { session: false }), async (req, res) => {
	
	const post = await Post.findById(req.params.id);
	if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
		return res.status(404).json({ commentnotexists: 'Comment does not exist' });
	}
	// Get /:comment_id
	const removeIndex = post.comments.map(item => item._id.toString()).indexOf(req.params.comment_id);
	post.comments.splice(removeIndex, 1);
	post.save().then(post => res.json(post)).catch(err => res.status(404).json({ postnotfound: 'No post found' }));
});


module.exports = router;