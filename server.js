var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;
var bodyParser = require('body-parser');


app.use(bodyParser.json());

app.get('/', function(req, res){
    res.send('todo API Root');
});

app.get('/todos', function(req, res){
    res.json(todos); 
});

app.get('/todos/:id', function(req, res){
    var todoId = parseInt(req.params.id, 10);
    var match;
    todos.forEach(function(item){
       if(todoId === item.id){
           res.json(item);
           match = true;
       }     
    });
 
    if(!match){
        res.status(404).send();
    }
});

app.post('/todos', function(req, res){
    var body = req.body;
    body.id = ++todoNextId;
    todos.push(body);
    res.json(todos); 
});


app.listen(PORT, function(){
   console.log('Express listening on port' + PORT); 
});