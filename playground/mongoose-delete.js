const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

const ObjectID = require('mongodb');

// Todo.findByIdAndRemove('5a05e95fc7f55913e0d4b23f').then((todo)=>{
//   console.log(todo);
// });

// Todo.remove().then((todo)=>{
//   console.log(todo);
// });
