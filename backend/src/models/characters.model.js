const mongoose = require('mongoose');

const CharactersSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    side: {
        type: String,
        required: true
    },
    power: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
}, {
    timeStamps: true
});

module.exports = mongoose.model('Characters', CharactersSchema);

