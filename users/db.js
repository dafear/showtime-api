const mongoose = require('mongoose');


mongoose.Promise = global.Promise;
var db = mongoose.createConnection("mongodb://dafear:sidney12@ds139480.mlab.com:39480/showtime-api");




module.exports = db; 











