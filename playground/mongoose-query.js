const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '59fdb1ce442693780f3a3ff6';
User.findById(id).then((user)=>{
  if(!user){
     return console.log('User not found');
  } else{
    console.log(JSON.stringify(user, undefined,2));
  }
}).catch((e)=>{
  console.log(e);
});
// Todo.find({
//   _id : id
// }).then((todo)=>{
//   console.log(`Todo: ${todo}`);
// });
// Todo.findOne({
//   _id:id
// }).then((todos)=>{
//   console.log(`Todos: ${todos}`);
// }).catch((e)=>{
//   return console.log(e);
// });
// Todo.findById(id).then((todo)=>{
//   if(!todo){
//     console.log("Id not found");
//   }
// }).catch((e)=>{
//   console.log(e);
// })
