var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

PersonSchema = new Schema({
    name: String,
    gender: String,
    image: String,
    uri: String,
    date_joined: Number,
    date_updated: Number,
    mission: {
        name: Number,
        date_start: Number,
        date_end: Date,
        language: String
    },
    current: {
        area: String,
        companion: String
    }
});

Person = mongoose.model('Person', PersonSchema, 'people');

module.exports.User = Person;