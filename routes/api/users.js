const router = require('express').Router();


// @access Public
router.get('/test', (req, res) => {
	res.json({ msg: 'Users works' });
});


module.exports = router;