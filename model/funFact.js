const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const funFactSchema = new Schema({
    state: {
        type: String,
        required: true
    },
    funfacts:[{
        type: String,
        require: false
    }]
});

module.exports = mongoose.model('States', funFactSchema);