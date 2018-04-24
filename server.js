const colors = require('colors');	// dev dependencies
const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

mongoose.connect('mongodb://localhost/social_network').then(() => console.log('Connected to MongoDB'), err => console.log(`DB Connection Error: ${err}`.red));


const app = express();

app.get('/', (req, res) => {
	res.send('Hello');
});

// Routes
app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/profile', profile);


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running: http://localhost:${port}`.bold));




