const mongoose = require('mongoose');
const schema = mongoose.Schema;

const UserSchema = new schema({
    id : Number,
    name : String,
    username : String,
    email : String,
    address: {
        street: String,
        suite: String,
        city: String,
        zipcode: String,
        geo: {
            lat: Number,
            lng: Number
        }
    },
    phone: String,
    website: String,
    company: {
        name: String,
        catchPhrase: String,
        bs: String
    }
});


module.exports =  mongoose.model('users',UserSchema);