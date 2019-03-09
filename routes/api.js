const express = require('express');
const router = express.Router();
const { authUser } = require('../config/auth')

// User Model
const User = require('../models/User');

// Buy Page
router.post('/buy/:sym/:num', authUser, (req, res) => {
    console.log(req.params);
    let { sym, num } = req.params;
    let errors = []
    if (!sym) {errors.push({msg: 'No Symbol Provided'})}
    if (!num && num < 1) {errors.push({msg: 'Must purchase at least 1 share'})}
    if (errors.length > 0) {res.status(422).send(errors)}
    else{
        User.findOne({email: req.user.email})
            .then(user => {
                console.log(user);
                res.status(200).json({
                    user
                })
            })
        }
});

// Sell Page
router.post('/sell/:sym/:num', authUser, (req, res) => res.send('Sell info'));

// Sell Page
router.post('/money/:method/:amount', authUser, (req, res) => {
    res.send(req)
});

module.exports = router;