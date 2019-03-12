const express = require('express');
const router = express.Router();
const { authUser } = require('../config/auth');
const axios = require('axios');

// User Model
const User = require('../models/User');

function updateStocks(user, cost, symbol, companyName, amount){
    let { stocks, funds } = user;
    let stock
    if (stocks && stocks[symbol]){
        let { price, quantity } = stocks[symbol];
        let avg = (price * quantity + cost) / (amount + quantity)
        stock = {
            quantity: amount + quantity,
            price: avg.toFixed(2),
            companyName
        }
    } else{
        stock = {
            quantity: amount,
            price: (cost / amount).toFixed(2),
            companyName
        }
    }   

    let newStocks = {
            ...stocks,
            [symbol]: stock
        }
    if(newStocks[symbol].quantity < 1){
        delete newStocks[symbol];
    }
   return {
        ...user._doc,
        funds: (funds - cost).toFixed(2),
        stocks: newStocks
    }
}


async function tradeStock(user, symbol, amount){
    let cost, companyName;
    let url = `https://api.iextrading.com/1.0/stock/${symbol}/quote?filter=latestPrice,companyName`
    await axios.get(url).then( reply => {
        cost = reply.data.latestPrice * amount;
        companyName = reply.data.companyName;
    })
    if (cost > user.funds) {throw({msg: 'Not enough funds' })}
    let newUser = updateStocks(user, cost, symbol, companyName, amount)
    return User.findOneAndReplace({ email : user.email}, newUser)
        .then(e => {return newUser})
        .catch(err => console.log(error))
}

// Buy Page
router.post('/buy/:symbol/:amount', authUser, (req, res, next) => {
    let { symbol, amount } = req.params;
    let errors = []
    if (!symbol) { errors.push({ msg: 'No symbol Provided' }) }
    if (amount % 1 != 0) { errors.push({ msg: 'Cannot purchase partial shares' }) }
    if (!amount && amount < 1) { errors.push({ msg: 'Must purchase at least 1 share' }) }
    if (errors.length > 0) { res.status(422).send(errors) }
    else{
        tradeStock(req.user, symbol, amount * 1)
            .then(user => {
                res.status(200).send({
                    ...user,
                    password: undefined,
                    _id: undefined,
                    date: undefined
                })
            })
            .catch(err => res.status(400).send({ msg: '401B: Something Happened' }));
    }
});

// Sell Page
router.post('/sell/:symbol/:amount', authUser, (req, res, next) => {
    let { symbol, amount } = req.params;
    let errors = []
    if (!symbol) { errors.push({ msg: 'No symbol selected' }) }
    if (amount % 1 != 0) { errors.push({ msg: 'Cannot sell partial shares' }) }
    if (!amount || amount < 1) { errors.push({ msg: 'Must sell at least 1 share' }) }
    if (amount > req.user.stocks[symbol].quantity){ errors.push({ msg: 'Cannot sell more stock than you own' }) }
    if (errors.length > 0) { res.status(422).send(errors) }
    else{
        tradeStock(req.user, symbol, amount * -1)
            .then(user => {
                res.status(200).send({
                    ...user,
                    password: undefined,
                    _id: undefined,
                    date: undefined
                })
            })
            .catch(err => res.status(400).send({ msg: '401S: Something Happened' }));
    }
});

// Add money route
router.post('/money/:sum', authUser, (req, res) => {
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