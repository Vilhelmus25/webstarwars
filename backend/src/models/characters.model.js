const mongoose = require('mongoose');

const CharactersSchema = mongoose.Schema({
    name_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    side: {
        type: String,
        required: true
    },
    power: {
        type: String,
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

