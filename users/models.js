const mongoose = require('mongoose');
const db = require('./db');
 mongoose.createConnection("mongodb://dafear:sidney123@ds151202.mlab.com:51202/showtime2");

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