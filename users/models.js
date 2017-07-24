const mongoose = require('mongoose');
const db = require('./db');
 mongoose.createConnection("mongodb://dafear456:sidney1234@ds127872.mlab.com:27872/showtime3");

const searchSchema = mongoose.Schema({
  //id: {type: String, required: true},
  url: {type: String, required: true},
  name: {type: String, required: true},
  address: {type: String, required: true},
  city: {type: String, required: true},
  
  });


searchSchema.methods.apiRepr = function() {

  return {
    id: this._id,
    url: this.url,
    name: this.name,
    address: this.address,
    city: this.city,
    
  };
};


const Search = mongoose.model('Search', searchSchema);

module.exports = {Search};