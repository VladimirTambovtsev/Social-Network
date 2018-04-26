const colors = require('colors');	// dev dependency
const router = require('express').Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

// Load User model
const User = require('../../models/User');
const key = require('../../config/keys');

// Load Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// @access Public
router.get('/test', (req, res) => {
	res.json({ msg: 'Users works' });
});

router.post('/register', async (req, res) => {
	const { errors, isValid } = validateRegisterInput(req.body);
	if (!isValid) {
		return res.status(400).json(errors);
	}

	const user = await User.findOne({ email: req.body.email });
		if (user) {
			errors.email = 'Email already exists';
			return res.status(400).json(errors);
		} else {
			const avatar = gravatar.url(req.body.email, { s: '200', r: 'pg', d: 'mm' });	// - email, { size, rating, default }

			const newUser = new User({
				name: req.body.name,
				email: req.body.email,
				avatar,
				password: req.body.password
			});

			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err;
					newUser.password = hash;
					newUser.save()
						.then(user => res.json(user))
						.catch(err => console.log(err.red))
				});
			});
		}
});

router.post('/login', async (req, res) => {
	const { errors, isValid } = validateLoginInput(req.body);
	if (!isValid) {
		return res.status(400).json(errors);
	}

	const email = req.body.email;
	const password = req.body.password;

	const user = await User.findOne({ email });
	if (!user) { errors.email = 'User not found'; return res.status(404).json(errors); };
	isMatch = await bcrypt.compare(password, user.password);
	if (isMatch) { 
		const payload = { id: user.id, name: user.name, avatar: user.avatar };


		jwt.sign(payload, key.secretKey, { expiresIn: 3600  }, (err, token) => 
			res.json({
				success: true,
				token: 'Bearer ' + token	// protocol
			})
		);
	} else {
		errors.password = 'Password incorrect';
		return res.status(400).json(errors); 
	}
});

// @desc Return current user
// @access Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
	res.json({
		id: req.user.id,
		name: req.user.name,
		email: req.user.email
	});
});


module.exports = router;


