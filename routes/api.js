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
        let avg = (price * quantity + 1*cost) / (1*amount + 1*quantity)
        stock = {
            quantity: 1*amount + 1*quantity,
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
    return {
        ...user._doc,
        funds: (funds - cost).toFixed(2),
        stocks: {
            ...stocks,
            [symbol]: stock
        }
    }

}

async function tradeStock(email, symbol, amount){
    return User.findOne({ email : email})
        .then(async(user) => {
            let cost, companyName;
            let url = `https://api.iextrading.com/1.0/stock/${symbol}/quote?filter=latestPrice,companyName`
            await axios.get(url).then( reply => {
                cost = reply.data.latestPrice * amount;
                companyName = reply.data.companyName;
            })
            if (cost > user.funds) {
                res.status(400).send({ msg: 'Not enough funds' })
                throw('not enough funds')
            }
            return updateStocks(user, cost, symbol, companyName, amount)
        }).then(user => {
            return User.updateOne({ email: email }, user)
                .then(e => {
                    return user;
                })
        }).catch(err => console.log(err))
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
        tradeStock(req.user.email, symbol, amount)
            .then(user => {
                console.log(user);
                res.status(200).send({
                    ...user,
                    password: undefined,
                    _id: undefined,
                    date: undefined
                })
            });
    }
});

// Sell Page
router.post('/sell/:symbol/:amount', authUser, (req, res, next) => {
    let { symbol, amount } = req.params;
    let errors = []
    if (!symbol) { errors.push({ msg: 'No symbol selected' }) }
    if (amount % 1 != 0) { errors.push({ msg: 'Cannot sell partial shares' }) }
    if (!amount && amount < 1) { errors.push({ msg: 'Must sell at least 1 share' }) }
    if (errors.length > 0) { res.status(422).send(errors) }
    else{
        tradeStock(req.user.email, symbol, amount * -1)
            .then(user => {
                res.status(200).send({
                    ...user._doc,
                    password: undefined,
                    _id: undefined,
                    date: undefined
                })
            });
    }
});

// Sell Page
router.post('/money/:method/:amount', authUser, (req, res) => {
    res.send(req)
});

module.exports = router;