// key exported to other modules for api scaling
if (process.env.NODE_ENV === 'production') {
	module.exports = require('./keys_prod');
} else {
	module.exports = require('./keys_dev');
}