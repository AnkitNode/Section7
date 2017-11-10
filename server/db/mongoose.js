var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.HEROKU_POSTGRESQL_GOLD_URL ||'mongodb://localhost:27017/TodoApp');

module.exports = {mongoose};
