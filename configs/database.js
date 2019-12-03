const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/UsersDB');

const db = mongoose.connection;

db.once('open', () => console.log('Database opened...'));
db.on('error', () => console.log('Error occured..'));

