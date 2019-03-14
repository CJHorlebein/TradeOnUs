const express = require('express');
const router = express.Router();
const { authUser } = require('../config/auth');
const axios = require('axios');

// db Models
const User = require('../models/User');
const Scores = require('../models/Scores');


function makeScores(user, funds){
    const scores = new Scores({
        name: 'high_scores',
        scores: [
            { funds: 20000, name: 'CJ'},
            { funds: 19000, name: 'John'},
            { funds: 18000, name: 'Bill'},
            { funds: 17000, name: 'Sandy'},
            { funds: 16000, name: 'Amanda'},
            { funds: 15000, name: 'Fred'},
            { funds: 14000, name: 'Hank'},
            { funds: 13000, name: 'Susan'},
            { funds: 12000, name: 'Sam'},
            { funds: 11000, name: 'Joe'},
        ]
    })
    scores.save();
    return null
}


// Retrieve high scores
router.get('/scores', (req, res) => {
    Scores.findOne({name: 'high_scores'})
        .then(reply => res.status(200).send(reply.scores))
        .catch(err => {console.log(err); res.sendStatus(400)})
});

// Add money route
router.post('/money/:sum', authUser, (req, res) => {
    // makeScores();
    let sum = req.params.sum * 1;
    if (!sum && sum < 0) { res.status(400).send({ msg: 'Amount added must be greater than 0' }) }
    else {
        let user = {
            ...req.user._doc, 
            funds: (req.user.funds + sum).toFixed(2)
        }
        User.findOneAndReplace({ email: user.email }, user)
            .then(e => {
                res.status(200).send({
                    ...user,
                    password: undefined,
                    _id: undefined,
                    date: undefined
                })
            }).catch(err => res.status(400).send({msg: 'Something Happened'}))
    }
});


module.exports = router;