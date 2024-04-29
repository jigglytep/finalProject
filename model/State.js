const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stateSchema = new Schema({
    state: {
        type: String,
        required: true
    },
    funfacts:[{
        type: String,
        require: false
    }]
},  { strict: true } );

module.exports = mongoose.model('State', stateSchema);