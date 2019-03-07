const express = require('express');
const router = express.Router();
const { authUser } = require('../config/auth')

// Portfolio Page
router.get('/', (req, res) => res.send('Portfolio Page'))

// Portfolio Page
router.get('/portfolio', authUser, (req, res) => res.send('Portfolio Page'))

// Account Page
router.get('/account', authUser, (req, res) => res.send('Account page'))

// Buy Page
router.post('/buy', authUser, (req, res) => res.send('Buy info'));

// Sell Page
router.post('/sell', authUser, (req, res) => res.send('Sell info'));

// Sell Page
router.post('/money/:method/:amount', authUser, (req, res) => {
    res.send(req)
});

module.exports = router;