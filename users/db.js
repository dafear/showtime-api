const mongoose = require('mongoose');


mongoose.Promise = global.Promise;
var db = mongoose.createConnection("mongodb://dafear:sidney123@ds151202.mlab.com:51202/showtime2");




module.exports = db; 











