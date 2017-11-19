const jwt = require('jsonwebtoken');


var data ={
  id:5
};

var token = jwt.sign(data,'1234');
console.log(token);


var decode = jwt.verify(token,'1234');
console.log('decode' ,decode);
