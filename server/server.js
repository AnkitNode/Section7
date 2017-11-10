var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todo', (req, res)=> {
  Todo.find().then((todo)=> {
    res.send({todo});
  },(e)=>{
    res.status(400).send(e)
  })
});

app.get('/todos/:id',(req,res)=>{
var id = req.params.id;
if(!(ObjectID.isValid(id))){
  return res.status(400).send('Invalid Id');
}
// else{
//   return res.status(200).send();
// }
Todo.findById(id).then((doc)=>{
  if(!doc){
    return res.status(404).send();
}
  res.send({doc})
}).catch((e)=>{
  return res.status(400).send();
})
});

app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = {app};