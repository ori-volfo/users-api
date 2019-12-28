const mongoose = require('mongoose');
const schema = mongoose.Schema;

const PostsSchema = new schema({
    id : { type : Number , unique : true, required : true },
    userId : Number,
    title : String,
    body : String
});


module.exports =  mongoose.model('posts',PostsSchema);