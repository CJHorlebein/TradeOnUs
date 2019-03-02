const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// User Model
const User = require('../models/User');

// Login Page
router.get('/login', (req, res) => res.send('login'));

// register Page
router.get('/register', (req, res) => res.send('register'));

// Register Handle
router.post('/register', (req, res) => {
    const {name, email, password, password2 } = req.body;
    let errors = [];

    // Check fields
    if (!(name && email && password && password2)){
        errors.push({msg: 'Please fill in all fields'});
    }
    if (password !== password2){
        errors.push({msg: 'Passwords do not match'});
    }
    if (password.length < 6){
        errors.push({msg: 'Password should be at least 6 characters'});
    }

    if(errors.length > 0){
        res.render('register',{
            errors,
            name,
            email,
            password,
            password2
        });
    } else{
        // Validation Passed
        User.findOne({ email: email})
            .then(user => {
                if(user) {
                    // User exists
                    errors.push({msg: 'Email already registered'});
                    res.render('register', {
                        errors,
                        name,
                        email,
                        password,
                        password2
                    });
                } else {
                    const newUser = new User({
                        name,
                        email,
                        password
                    });

                    // Hash Password
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if(err) throw err;

                            // Set password to Hashed
                            newUser.password = hash;

                            // Save user
                            newUser.save()
                                .then(user => {
                                    res.redirect('/users/login');
                                })
                                .catch(err => console.log(err));
                        });
                    });
                }
            });
    }
});

// Login Handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login'
    })(req, res, next);
});


// Logout Handle
router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/users/login');
})

module.exports = router;