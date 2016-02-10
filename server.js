var express = require('express'),
    app = express(),
    PORT = process.env.PORT || 3000,
    todos = [],
    todoNextId = 1,
    bodyParser = require('body-parser'),
    _ = require('underscore');



    app.use(bodyParser.json());

    app.get('/', function(req, res){
        res.send('todo API Root');
    });

    app.get('/todos', function(req, res){
        res.json(todos); 
    });

app.get('/todos/:id', function(req, res){
    var todoId = parseInt(req.params.id, 10),
        match = _.findWhere(todos, {id: todoId});
    
    if(match){
        res.json(match);
    }else{
        res.status(404).send();
    }
});

app.post('/todos', function(req, res){
    var body = _.pick(req.body, 'description', 'completed');
    body.description = body.description.trim();
    body.id = todoNextId++;
    todos.push(body);
    res.json(todos); 
});


app.listen(PORT, function(){
   console.log('Express listening on port' + PORT); 
});