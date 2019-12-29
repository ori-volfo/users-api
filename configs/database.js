const mongoose = require('mongoose');
const axios = require('axios');

mongoose.connect('mongodb://localhost:27017/UsersDB');

const db = mongoose.connection;

db.once('open', () => console.log('Database opened...'));
db.on('error', () => console.log('Error occured..'));

let DB = {};

DB.init = function(usersInitURL,postsInitURL,todosInitURL) {
    usersInit(usersInitURL);
    postsInit(postsInitURL);
    todosInit(todosInitURL);
};

async function usersInit(url){

    let users = await axios.get(url);
    users.data.forEach(user =>{
            axios.post('http://localhost:8000/api/users/',user);
        }
    )
}

async function postsInit(url){

    let posts = await axios.get(url);
    posts.data.forEach(post =>{
            axios.post('http://localhost:8000/api/posts/',post);
        }
    )
}

async function todosInit(url){

    let todos = await axios.get(url);
    todos.data.forEach(todo =>{
            axios.post('http://localhost:8000/api/todos/',todo);
        }
    )
}

module.exports = DB;