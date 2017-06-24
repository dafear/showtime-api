const express = require('express');
const router = express.Router();
// const cors = require('cors');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const http = require('http');
const passport = require('passport');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');





app.use(bodyParser.json());

mongoose.Promise = global.Promise;


  // const passRouter = require('./users/passRouter.js');
 // const {router: passRouter} = require('./users/pass.js');
 const stateRouter = require('./users/stateRouter.js');
const searchRouter = require('./users/searchRouter.js');
const {PORT, DATABASE_URL} = require('./config');


  // app.use(passRouter);
 // app.use('/users/', usersRouter);


  app.use((req, res, next) => {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
 });





 app.use('/', stateRouter);
 app.use('/', searchRouter);
 app.use(morgan('common'));
// app.use(express.static('public'));
 // app.use(cookieParser());
// app.use(cors());

 //   app.use((req, res, next) => {
 //   res.header("Access-Control-Allow-Origin", "*");
 //   res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
 //   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 //   next();
 // });
// app.get('/', function(req, res, next) {
//   // Handle the get for this route
// });

//  app.post('http://localhost:8080/savedSearches', function(req, res, next) {
// //  // Handle the post for this route
//  });







// app.use('*', function(req, res) {
//   return res.status(404).json({message: 'Not Found'});
// });

// app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
// app.use(passport.initialize());
// app.use(passport.session()); // persistent login sessions
// app.use(flash());

// require('./app/routes.js')(app, passport);

 // app.get('/search', function (req, res) {
 //  console.log('hello',req.query.q)
 //  res.sendFile(path.join(__dirname + '/public/index.html'));
 // });




let server;


   function runServer(databaseUrl=DATABASE_URL, port=PORT) {

    return new Promise((resolve, reject) => {
    mongoose.connect('mongodb://dafear:sidney12@ds139480.mlab.com:39480/showtime-api', err => {
     

      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}


function closeServer() {
  return mongoose.disconnect().then(() => {
     return new Promise((resolve, reject) => {
       console.log('Closing server');
       server.close(err => {
           if (err) {
               return reject(err);
           }
           resolve();
       });
     });
  });
}

if (require.main === module) {
  
  setTimeout(function() {
runServer().catch(err => console.error(err));
  }, 2000);
};


  

module.exports = {app, runServer, closeServer};




