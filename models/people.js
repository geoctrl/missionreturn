var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

PersonSchema = new Schema({
    name: String,
    token: String,
    email: String,
    password: String,
    gender: String,
    img_profile: String,
    img_background: String,
    uri: String,
    date_joined: Number,
    date_updated: Number,
    mission: {
        name: Number,
        date_start: Number,
        date_end: Number,
        language: String
    },
    current: {
        area: String,
        companion: String
    },
    images: [
        {
            description: String,
            file: String
        }
    ]
});

Person = mongoose.model('Person', PersonSchema, 'people');

module.exports.User = Person;