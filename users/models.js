const mongoose = require('mongoose');
const db = require('./db');
 mongoose.createConnection("mongodb://dafear7:sidney457@ds127443.mlab.com:27443/showtime4");

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