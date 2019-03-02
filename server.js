const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');

// Passport config
require('./config/passport')(passport);

// DB Setup
const db = require('./config/keys').MongoURI;
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// BodyParser
app.use(express.urlencoded({ extended: false }));

// Express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
// app.use('/api', (req, res, next) => req.ip == '162.255.119.154' ? next() : res.end());
app.use('/users', require('./routes/users'));
app.use('/api', require('./routes/api'));


app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
