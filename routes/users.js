const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// User Model
const User = require('../models/User');

let capitalize = (word) => word.slice(0,1).toUpperCase() + word.slice(1)

// Register Handle
router.post('/register', (req, res) => {
    let {fname, lname, email, password, password2 } = req.body;
    let errors = [];
    fname = capitalize(fname);
    lname = capitalize(lname);

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
                        watch: [],
                        stocks: {}
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
    res.sendStatus(200);
})

module.exports = router;