const mongoose = require('mongoose');
const axios = require('axios');

mongoose.connect('mongodb://localhost:27017/UsersDB');

const db = mongoose.connection;

db.once('open', () => console.log('Database opened...'));
db.on('error', () => console.log('Error occured..'));

let DB = {};

DB.init = function(usersInitURL) {
    usersInit(usersInitURL);
};

async function usersInit(url){

    let users = await axios.get(url);
    users.data.forEach(user =>{
            axios.post('http://localhost:8000/api/users/',user);
        }
    )
}

module.exports = DB;