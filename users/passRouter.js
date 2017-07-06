const {BasicStrategy} = require('passport-http');
const express = require('express');
const jsonParser = require('body-parser').json();
const passport = require('passport');

const {User} = require('./usersModels.js');

const router = express.Router();

router.use(jsonParser);


// NB: at time of writing, passport uses callbacks, not promises
const basicStrategy = new BasicStrategy((email, password, callback) => {
  let user;
  User
    .findOne({email: email})
    .exec()
    .then(_user => {
      user = _user;
      if (!user) {
        return callback(null, false);
      }
      return user.validatePassword(password);
    })
    .then(isValid => {
      if (!isValid) {
        return callback(null, false);
      }
      else {
        return callback(null, user);
      }
    })
    .catch(err => callback(err));
});

passport.use(basicStrategy);
router.use(passport.initialize());

router.post('/', (req, res) => {
  if (!req.body) {
    return res.status(400).json({message: 'No request body'});
  }
  console.log(req.body);
  if (!('email' in req.body)) {
    return res.status(422).json({message: 'Missing field: email'});
  }

  let {email, password} = req.body;

  if (typeof email !== 'string') {
    return res.status(422).json({message: 'Incorrect field type: email'});
  }

  email = email.trim();

  if (email === '') {
    return res.status(422).json({message: 'Incorrect field length: email'});
  }

  if (!(password)) {
    return res.status(422).json({message: 'Missing field: password'});
  }

  if (typeof password !== 'string') {
    return res.status(422).json({message: 'Incorrect field type: password'});
  }

  password = password.trim();

  if (password === '') {
    return res.status(422).json({message: 'Incorrect field length: password'});
  }

  // check for existing user
  return User
    .find({email})
    .count()
    .exec()
    .then(count => {
      if (count > 0) {
        return res.status(422).json({message: 'email already taken'});
      }
      // if no existing user, hash password
      return User.hashPassword(password)
    })
    .then(hash => {
      return User
        .create({
          email: email,
          password: hash
          
        })
    })
    .then(user => {
      return res.status(201).json(user.apiRepr());
    })
    .catch(err => {
      res.status(500).json({message: 'Internal server error'})
    });
});

// never expose all your users like below in a prod application
// we're just doing this so we have a quick way to see
// if we're creating users. keep in mind, you can also
// verify this in the Mongo shell.
  // router.get('/', (req, res) => {
  //   return User
  //    .find()
  //   .exec()
  //     .then(users => res.json(users.map(user => user.apiRepr())))
  //     .catch(err => console.log(err) && res.status(500).json({message: 'Internal server error'}));
  // });




 router.get('/more',
   passport.authenticate('basic', {session: false}),
   (req, res) => res.json({user: req.user.apiRepr()})
 );


module.exports = router;
