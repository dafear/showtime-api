const mongoose = require('mongoose');
const db = require('./db');
 mongoose.createConnection("mongodb://dafear:sidney12@ds139480.mlab.com:39480/showtime-api");

const bcrypt = require('bcrypt');


mongoose.Promise = global.Promise;



const UserSchema = mongoose.Schema({
   email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
//   firstName: {type: String, default: ""},
//   lastName: {type: String, default: ""}
 });

UserSchema.methods.apiRepr = function() {
  return {
    email: this.email || '',
    
  };
}

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
}

UserSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
}

const User = mongoose.model('User', UserSchema);

module.exports = {User};
