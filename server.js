var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [{
    id: 1,
    description:'Meet god for lunch',
    completed: false
}, {
    id: 2,
    description:'go to market',
    completed:false
},{
    id:3,
    description:'hahaha',
    completed:true
}];


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


app.listen(PORT, function(){
   console.log('Express listening on port' + PORT); 
});