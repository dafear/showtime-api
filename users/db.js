const mongoose = require('mongoose');


mongoose.Promise = global.Promise;
var db = mongoose.createConnection("mongodb://dafear7:sidney457@ds127443.mlab.com:27443/showtime4");




module.exports = db; 











