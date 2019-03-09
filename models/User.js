let mongoose = require('mongoose');

// User Schema
let UserSchema = new mongoose.Schema({
    fname : {
        type: String,
        required: true
    },
    lname : {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    history: {
        type: [String]
    },
    watch: {
        type: [String]
    },
    funds: {
        type: Number
    },
    stocks: [{ 
        type: [String]
    }]
})

let User = mongoose.model('User', UserSchema);

module.exports = User;