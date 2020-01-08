const express = require('express');
const router = express.Router();
const axios = require('axios');
const MODEL_PATH = '../models/';
const Todo = require(MODEL_PATH+'todosModel');
const Files = require(MODEL_PATH+'filesModel');


// List all todos
router.route('/')
    .get(function(req,resp){

        Todo.find({}, function(err,todoObj){
            if(err){
                return resp.send(err);
            }
            return resp.json(todoObj);
        })
    });

// Find todo by ID
router.route('/:id')
    .get(function(req,resp){
        Todo.find( {id:req.params.id} , function(err,per){
            if(err){
                return resp.send(err);
            }
            return resp.json(per);
        })
    });

// Insert new todo
router.route('/')
    .post(function(req,resp){
        let newTodo = new Todo({
            id : req.body.id,
            userId : req.body.userId,
            title : req.body.title,
            completed : req.body.completed,
        });

        newTodo.save(function(err){
            if(err){
                return resp.send(err);
            }
            else{
                return resp.send(`Todo ${req.body.title} was added!`);
            }
        })
    });

// Update todo by ID
router.route('/:id')
    .put(async function(req,resp){

        const response = await axios.get('http://localhost:8000/api/todos/'+req.params.id);
        let updatedTodo = response.data;

        for(let key in req.body){
            updatedTodo[key] = req.body[key];
        }
        Todo.updateOne({id:req.params.id},updatedTodo,function(err){
            if(err){
                return resp.send(err);
            }
            else{
                Files.writeToFile('todos.txt',{'data':req.body,'Original Data':response.data,'New Data':updatedTodo});
                return resp.send(`Todo ${req.params.id} was updated!`);
            }
        })
    });

// Delete todo by ID
router.route('/:id')
    .delete(function(req,resp){

        Todo.findOneAndDelete({id:req.params.id},function(err){
            if(err){
                return resp.send(err);
            }
            else{
                Files.writeToFile('todos.txt',{'Todo deleted':req.params.id});
                return resp.send(`Todo ${req.params.id} was deleted!`);
            }
        })
    });

module.exports = router;