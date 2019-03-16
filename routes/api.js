const express = require('express');
const router = express.Router();
const { authUser } = require('../config/auth');
const axios = require('axios');

// db Models
const User = require('../models/User');
const Scores = require('../models/Scores');
const stocks = require('./stocks.json');

function makeScores(){
    console.log('New Scores')
    const scores = new Scores({
        name: 'high_scores',
        scores: [
            { funds: 12000, email: 'agfdsdfgsf', name: 'Ron'},
            { funds: 11500, email: 'bgfdsdfgsf', name: 'John'},
            { funds: 11000, email: 'cgfdsdfgsf', name: 'Bill'},
            { funds: 10500, email: 'dgfdsdfgsf', name: 'Sandy'},
            { funds: 10000, email: 'egfdsdfgsf', name: 'Amanda'},
            { funds: 9500,  email: 'fgfdsdfgsf', name: 'Fred'},
            { funds: 8500,  email: 'ggfdsdfgsf', name: 'Hank'},
            { funds: 8000,  email: 'hgfdsdfgsf', name: 'Susan'},
            { funds: 7500,  email: 'igfdsdfgsf', name: 'Sam'},
            { funds: 7000,  email: 'jgfdsdfgsf', name: 'Joe'},
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
    makeScores();
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