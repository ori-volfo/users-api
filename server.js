const express = require('express');
const app = express();
const axios = require('axios');
const usersInitURL = 'https://jsonplaceholder.typicode.com/users';

const bodyParser = require('body-parser');

require('./configs/database');

app.use(bodyParser.urlencoded({extended : true}))
    .use(bodyParser.json());

app.use('/api/users',require('./routes/usersRoute'));

app.listen(8000);

init();

function init() {
    usersInit(usersInitURL);
}

async function usersInit(url){
    let users = await axios.get(url);
    users.data.forEach(user =>{
        axios.post('http://localhost:8000/api/users/',user);
        }
    )
}