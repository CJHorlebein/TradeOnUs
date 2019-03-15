const express = require('express');
const router = express.Router();
const { authUser } = require('../config/auth');
const axios = require('axios');

// db Models
const User = require('../models/User');
const Scores = require('../models/Scores');
const stocks = require('./stocks.json');

function makeScores(user, funds){
    const scores = new Scores({
        name: 'high_scores',
        scores: [
            { funds: 20000, email: '', name: 'CJ'},
            { funds: 19000, email: '', name: 'John'},
            { funds: 18000, email: '', name: 'Bill'},
            { funds: 17000, email: '', name: 'Sandy'},
            { funds: 16000, email: '', name: 'Amanda'},
            { funds: 15000, email: '', name: 'Fred'},
            { funds: 14000, email: '', name: 'Hank'},
            { funds: 13000, email: '', name: 'Susan'},
            { funds: 12000, email: '', name: 'Sam'},
            { funds: 11000, email: '', name: 'Joe'},
        ]
    })
    scores.save();
}

// return stock symbol
router.get('/companies', (req, res) => {
    let pos = ~~(stocks.symbols.length * Math.random())
    res.status(200).json({symbol: stocks.symbols[pos]})
})

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