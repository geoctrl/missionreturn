var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

PersonSchema = new Schema({
    name: String,
    gender: String,
    img_profile: Number,
    img_background: Number,
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
    },
    images: [
        {
            id: Number,
            name: String,
            description: String,
            file: String
        }
    ]
});

Person = mongoose.model('Person', PersonSchema, 'people');

module.exports.User = Person;