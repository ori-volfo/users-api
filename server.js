const express = require('express');
const app = express();
const args = require('minimist')(process.argv.slice(2));
const usersInitURL = 'https://jsonplaceholder.typicode.com/users';
const postsInitURL = 'https://jsonplaceholder.typicode.com/posts';
const bodyParser = require('body-parser');
const DB = require('./configs/database');

app.use(bodyParser.urlencoded({extended : true}))
    .use(bodyParser.json());

app.use('/api/users',require('./routes/usersRoute'));
app.use('/api/posts',require('./routes/postsRoute'));

app.listen(8000);



if(args.initDB){
    DB.init(usersInitURL,postsInitURL);
}
