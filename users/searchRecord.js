const mongoose = require('mongoose');
const db = require('./db');
mongoose.createConnection("mongodb://dafear7:sidney457@ds127443.mlab.com:27443/showtime4");
  

  const resultSchema = mongoose.Schema ({
  
       url: String,
       name: String,
       address: String,
       city: String
   })

const searchRecordSchema = mongoose.Schema({
  
     term: {type: String, required: true},
     userEmail: {type: String, required: true},
     searchedAt: {type: String, required: true},
     results: [resultSchema],
     

  
  
  });


searchRecordSchema.methods.apiRepr = function() {

  return {
     term: {type: String, required: true},
     searchedAt: {type: String, required: true},
     userEmail: {type: String, required: true},
     results: [resultSchema],
    

   
    
  };
};


const searchRecord = mongoose.model('searchRecord', searchRecordSchema);

module.exports = { searchRecord };