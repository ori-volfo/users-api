const mongoose = require('mongoose');
const schema = mongoose.Schema;

const UserSchema = new schema({
    id : { type : Number , unique : true, required : true },
    name : String,
    username : { type : String , unique : true, required : true },
    email : { type : String , unique : true, required : true },
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