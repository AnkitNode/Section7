require('./config/config');
var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
const _ = require('lodash');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');
var port = process.env.PORT;
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
app.delete('/todos/:id', (req, res)=>{
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(400).send('Invalid id, please check the Id');
  }
  Todo.findByIdAndRemove('id').then((doc)=>{
    if(!doc){
      return res.status(404).send();
    }
    res.status(200).send({doc});
  }).catch((e)=>{
    return res.status(400).send();
  });
});

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
});

app.post('/user', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  })
});

app.get('/user/me', authenticate, (req,res)=>{
res.send(req.user);
});

app.post('/user/login',(req,res)=>{
  var body = _.pick(req.body, ['email', 'password']);
User.findByCredentials(body.email,body.password).then((user)=>{
  res.header('x-auth',token).send(user);
}).catch((e)=>{
  res.status(400).send();
})
    });

app.delete('/user/me/token', authenticate,(req,res) => {
    req.user.removeToken(req.token).then(()=>{
      res.status(200).send();
  }, ()=>{
    res.status(400).send();
  })
});
app.listen(3000, () => {
  console.log(`Started on port 3000`);
});
module.exports = {app};
