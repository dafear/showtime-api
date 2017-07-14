const mongoose = require('mongoose');
const db = require('./db');
 mongoose.createConnection("mongodb://dafear:sidney123@ds151202.mlab.com:51202/showtime2");

const bcrypt = require('bcrypt-nodejs');


mongoose.Promise = global.Promise;



const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  password: {
    type: String,
    select: false,
    required: true
  },
  
});

/// hashing before saves
// pre-save
userSchema.pre('save', function(next) {
  var user = this;

  if (!user.isModified('password'))
    return next(); // means that if the password is not changed, just go to the next part and save the user

  bcrypt.hash(user.password, null, null, function(err, hash) {
    if (err)
      return next(err);
    user.password = hash;
    next();
  });
});

//compare password
userSchema.methods.comparePassword = function(password) {
  var user = this;
  return bcrypt.compareSync(password, user.password);

}

const User = mongoose.model('User', userSchema);

module.exports = {User};





