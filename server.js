const colors = require('colors');	// dev dependency
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

mongoose.connect('mongodb://localhost/social_network').then(() => console.log('Connected to MongoDB'), err => console.log(`DB Connection Error: ${err}`.red));

const app = express();


// body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// passport
app.use(passport.initialize());
require('./config/passport')(passport);

// Routes
app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/profile', profile);


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running: http://localhost:${port}`.bold));




