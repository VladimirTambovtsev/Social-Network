const router = require('express').Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load validation
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');

// Load model
const Profile = require('../../models/Profile');
const User = require('../../models/User');


router.get('/test', (req, res) => {
	res.json({ msg: 'Profile works' });
});


// @desc Get profile by ID
// @access Public
router.get('/handle/:handle', async (req, res) => {
	try {
		const errors = {};
		const profile = await Profile.findOne({ handle: req.params.handle }).populate('user', ['name', 'avatar']);
		if (!profile) {
			errors.noprofile = 'There is no profile for this user';
			res.status(404).json(errors);
		}
		res.json(profile);
	} catch (err) { res.status(404).json({ profile: 'There is no profile for this user' }) };
});

// @desc Get user by ID
// @access Public
router.get('user/:user_id', async (req, res) => {
	try {
		const errors = {};
		const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);
		if (!profile) {
			errors.noprofile = 'There is no profile';
			res.status(404).json(errors);
		}
		res.json(profile);
	} catch (err) { res.status(404).json({ profile: 'There is no profile for this user' }) };
});

// @access Public
router.get('/all', async (req, res) => {
	try {
		const errors = {};
		const profiles = await Profile.find().populate('user', ['name', 'avatar'])
		if (!profiles) {
			errors.noprofiles = 'There are no profiles';
			res.status(404).json(errors);
		}	res.json(profiles);
	} catch (err) { res.status(404).json({ profile: 'There are no profiles' }) };
});

// @descr Get current user profile from jwt
// @access Private
router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
	const errors = {};
	const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);
		if (!profile) {
			errors.noprofile = 'There is no profile for this user'
			return res.status(404).json(errors);
		}
		res.json(profile);
});



// @descr Create or edit user profile
// @access Private
router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
	// Check validation
	const { errors, isValid } = validateProfileInput(req.body);
	if (!isValid) { return res.status(400).json(errors); }

	const profileFields = {};
	profileFields.user = req.user.id;
	if (req.body.handle) profileFields.handle = req.body.handle;
	if (req.body.company) profileFields.company = req.body.company;
	if (req.body.website) profileFields.handle = req.body.handle;
	if (req.body.location) profileFields.location = req.body.location;
	if (req.body.bio) profileFields.bio = req.body.bio;
	if (req.body.status) profileFields.status = req.body.status;
	if (req.body.githubusername) profileFields.githubusername = req.body.githubusername;

	// Skills - split into array
	if (typeof req.body.skills !== 'undefined') {
		profileFields.skills = req.body.skills.split(',');
	}

	// Social
	profileFields.social = {};
	if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
	if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
	if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
	if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
	if (req.body.vk) profileFields.social.vk = req.body.vk;
	
	// If profile exists, update info
	const profile = await Profile.findOne({ user: req.user.id });
	if (profile) {
		Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true })
			.then(profile => res.json(profile));
	} else {
		// If handle exists, save info
		const handle = await Profile.findOne({ handle: profileFields.handle })			
			if (profile) {
				errors.handle = 'That handle already exists';
				res.status(400).json(errors);
			}
			new Profile(profileFields).save().then(profile => res.json(profile));
	}
});

// @desc Add experience to profile
// @access Private
router.post('/experience', passport.authenticate('jwt', { session: false }), async (req, res) => {
	// Check validation
	const { errors, isValid } = validateExperienceInput(req.body);
	if (!isValid) { return res.status(400).json(errors); }

	const profile = await Profile.findOne({ user: req.user.id });
	const newExp = {
		title: req.body.title,
		company: req.body.company,
		location: req.body.location,
		from: req.body.from,
		to: req.body.to,
		current: req.body.current,
		description: req.body.description
	}

	profile.experience.unshift(newExp);
	profile.save().then(profile => res.json(profile));
});

// @desc Add education to profile
// @access Private
router.post('/education', passport.authenticate('jwt', { session: false }), async (req, res) => {
	// Check validation
	const { errors, isValid } = validateEducationInput(req.body);
	if (!isValid) { return res.status(400).json(errors); }

	const profile = await Profile.findOne({ user: req.user.id });
	const newEd = {
		school: req.body.school,
		degree: req.body.degree,
		fieldofstudy: req.body.fieldofstudy,
		from: req.body.from,
		to: req.body.to,
		current: req.body.current,
		description: req.body.description
	}

	profile.education.unshift(newEd);
	profile.save().then(profile => res.json(profile));
});


// @desc Delete experience to profile
// @access Private
router.delete('/experience/:exp_id', passport.authenticate('jwt', { session: false }), async (req, res) => {

	const profile = await Profile.findOne({ user: req.user.id });
	const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);
	profile.experience.splice(removeIndex, 1);
	profile.save().then(profile => res.json(profile)).catch(err => res.status(404).json(err));
});

// @desc Delete education to profile
// @access Private
router.delete('/education/:ed_id', passport.authenticate('jwt', { session: false }), async (req, res) => {

	const profile = await Profile.findOne({ user: req.user.id });
	const removeIndex = profile.education.map(item => item.id).indexOf(req.params.ed_id);
	profile.education.splice(removeIndex, 1);
	profile.save().then(profile => res.json(profile)).catch(err => res.status(404).json(err));
});

// @desc Delete user's profile
// @access Private
router.delete('/', passport.authenticate('jwt', { session: false }), async (req, res) => {

	const profile = await Profile.findOneAndRemove({ user: req.user.id });
	const user = await User.findOneAndRemove({ _id: req.user.id });
	res.json({ success: true });
});

module.exports = router;