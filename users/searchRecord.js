const mongoose = require('mongoose');
const db = require('./db');
mongoose.createConnection("mongodb://dafear456:sidney1234@ds127872.mlab.com:27872/showtime3");
  

  const resultSchema = mongoose.Schema ({
       // id: String, 
       url: String,
       name: String,
      address: String,
      city: String
   })
const searchRecordSchema = mongoose.Schema({
  
     term: {type: String, required: true},
     searchedAt: {type: String, required: true},
      // userId: {type: String, required: true},
     results: [resultSchema],
     

  //id: {type: String, required: true},
  // url: {type: String, required: true},
  // name: {type: String, required: true},
  // address: {type: String, required: true},
  // city: {type: String, required: true},
  
  });


searchRecordSchema.methods.apiRepr = function() {

  return {
     term: {type: String, required: true},
     searchedAt: {type: String, required: true},
      // userId: {type: String, required: true},
     results: [resultSchema],
    

    // id: this._id,
    // url: this.url,
    // name: this.name,
    // address: this.address,
    // city: this.city,
    
  };
};


const searchRecord = mongoose.model('searchRecord', searchRecordSchema);

module.exports = {searchRecord};