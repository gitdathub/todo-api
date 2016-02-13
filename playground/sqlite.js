//Dependency to convert SQLITE data into JSON for easy manipulation

var Sequelize = require('sequelize'),
    sequelize = new Sequelize(undefined, undefined, undefined, {
       'dialect': 'sqlite',
       'storage': __dirname + '/sqlite.sqlite' //first sqlite is the filename
    });    //dirname saves it in the same folder

var Todo = sequelize.define('todo', {
   description:{
       type: Sequelize.STRING,
       allowNull:false,
       validate:{
           len:[1, 250]
       }
   },
   completed:{
       type: Sequelize.BOOLEAN,
       allowNull:false,
       defaultValue:false
   }
});
//fetch todo item by id, if print it to JSon, else print error not found

sequelize.sync().then(function(){
   console.log('Everything is synced'); 

   Todo.findById(2).then(function (todo){
       if(todo){
           console.log(todo.toJSON());
       }else {
           console.log('error');
       }
   });
});
    
/*   Todo.create({
      description:'walking the dog',
  
    }).then(function (todo){
        return Todo.create({
            description: 'Clean office',
        });
    }).then(function(){
        return Todo.findAll({
            where:{
                description:{
                 $like: '%dog%'   // you can use $like to search any kind of string , the % lets    
                }                   // the computer ignore whats on either side of it
            }
        }); 
    }).then(function(todos){
        if(todos){
            todos.forEach(function (todo){
                console.log(todo.toJSON());
            });
        }else{
            console.log('no todo found');
        }        
    }).catch(function(e){
      console.log(e);  
    }); */

