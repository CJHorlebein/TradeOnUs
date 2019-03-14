let mongoose = require('mongoose')

let ScoresSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    scores: {
        type: mongoose.Mixed,
        required: true
    }
        
})

let Scores = mongoose.model('Scores', ScoresSchema)

module.exports = Scores