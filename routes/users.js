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
    const {fname, lname, email, password, password2 } = req.body;
    let errors = [];

    // Check fields
    if (!(fname  && lname && email && password && password2)){
        errors.push({msg: 'Please fill in all fields'});
    }
    if (password !== password2){
        errors.push({msg: 'Passwords do not match'});
    }
    if (password === undefined || password.length < 6){
        errors.push({msg: 'Password should be at least 6 characters'});
    }
    
    if(errors.length > 0){
        res.status(422).send(errors);
    } else{
        // Validation Passed
        User.findOne({ email: email})
            .then(user => {
                if(user) {
                    // User exists
                    errors.push({msg: 'Email already registered'});
                    res.status(401).send(errors)
                } else {
                    const newUser = new User({
                        fname,
                        lname,
                        email,
                        password,
                        funds: 10000,
                        history: [],
                        watchlist: [],
                        stocks: []
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
                                    res.status(200).json({
                                        ...user._doc,
                                        password: undefined,
                                        _id: undefined,
                                        date: undefined
                                    })
                                })
                                .catch(err => console.log(err));
                        });
                    });
                }
            });
    }
});

// Login Handle
router.post('/login',
    passport.authenticate('local'), 
    (req, res) => {
        res.send({
        ...req.user._doc,
        password: undefined,
        _id: undefined,
        date: undefined
        })
    }
)

// Logout Handle
router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/users/login');
})

module.exports = router;