const mongoose = require('mongoose');
const schema = mongoose.Schema;

const TodoSchema = new schema({
    id : { type : Number , unique : true, required : true },
    userId : Number,
    title : String,
    completed : Boolean
});


module.exports =  mongoose.model('todos',TodoSchema);