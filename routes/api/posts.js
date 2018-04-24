const router = require('express').Router();

router.get('/test', (req, res) => {
	res.json({ msg: 'Posts works' });
});


module.exports = router;