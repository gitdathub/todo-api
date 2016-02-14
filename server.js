var express = require('express'),
    app = express(),
    
    //Heroku requires its own Port, use 3000 if not provided
    PORT = process.env.PORT || 3000,
    
    //Global Array for storing database objects
    todos = [],
    
    //TODOS INCREMENTER
    todoNextId = 1,
    
    //REQUIRED FOR RECEIVING BODY RESPONSES 
    bodyParser = require('body-parser'),
    
    //EASY FILTERING LIBRARY
    _ = require('underscore'),

    //get Sequelize with DB
    db = require('./db.js');
    
    //CALLING BODYPARSER FOR USE BEFORE USING IT PLEASE
    app.use(bodyParser.json());

    app.get('/', function(req, res){
        res.send('todo API Root');
    });

    app.get('/todos', function(req, res){
        var queryParams = req.query;
        var filtodo = todos;
        
        if(queryParams.hasOwnProperty('q') && queryParams.q.length > 0){
            filtodo = _.filter(filtodo, function(todo){
               return todo.index(queryParams.q) > -1; 
            });
        }
        
        res.json(todos); 
    });

app.get('/todos/:id', function(req, res){
    
    //ID RESPONSE NEED TO BE "INTEFIED" BEFORE MANIPULATION
    var todoId = parseInt(req.params.id, 10),
        match = _.findWhere(todos, {id: todoId}); // UNDERSCORE LOCATING ARRAY OBJECT BY ID  
    
    db.todo.findById(todoId).then(function(thisobject){
        res.json(thisobject);
    }, function(err){
        res.status(400).json(err);
    });
        
});

app.post('/todos', function(req, res){
    var body = _.pick(req.body, 'description', 'completed'); // UNDERSCORE FILTERING FOR OBJECT ELEMENTS
   
    db.todo.create(body).then(function(item){
        res.json(item);
    }, function(e){
        res.status(400).json(e);
    });
    
    //    body.description = body.description.trim();
    //    body.id = todoNextId++;
    //    todos.push(body);
    //    res.json(todos); 
});

app.put('/todos/:id', function(req, res){
    
    var todoId = parseInt(req.params.id, 10), // for some reason the id needs to be parsed to int ,JDI
        match = _.findWhere(todos, {id: todoId}),
        body = _.pick(req.body, 'description', 'completed'),
        attributes = {};
    
    if(!match){
        return res.status(400).send();
    }
    
    
    if(body.hasOwnProperty('completed') && _.isBoolean(body.completed)){
        attributes.completed = body.completed;
    } else if(body.hasOwnProperty('completed')){
        return res.status(400).send();
    }
    
    if(body.hasOwnProperty('description') && body.description.trim().length > 0 && _.isString(body.description)){
        attributes.description = body.description;
    } else if(body.hasOwnProperty('description')){
        return res.status(400).send();
    } 
    
    _.extend(match, attributes);
    
    res.json(todos);
    
});


db.sequelize.sync().then(function(){
   app.listen(PORT, function(){
   console.log('Express listening on port' + PORT); 
   });
});



