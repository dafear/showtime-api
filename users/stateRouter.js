const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const morgan = require('morgan');
const http = require('http');
const path = require('path');
// const cookie = require ('cookie');
// const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const request = require('request');

mongoose.Promise = global.Promise;


router.use(bodyParser.urlencoded({ extended: false, 
  parameterLimit: 1000000}));

// router.use(cookieParser());
router.use(bodyParser.json());
 router.use(methodOverride());


// const {Search} = require('../users/models.js');
const {searchRecord} = require('../users/searchRecord.js')


var musicVenuesUrl = "https://api.foursquare.com/v2/venues/search?client_id=RJOUU0EF0YKAJSRBHPBH4W1ONGHH35QXWIARJSJ515GLLSSM&client_secret=KSTQPMQPSUBBFZA2EJ0WYHTMR2VU4OVMIEJAI1WQHNLCU2ZF&ll=43.2994, 74.2179&near=New York, Ny&query=music&limit=100&radius=200000&categoryid=4bf58dd8d48988d1e5931735,4d4b7104d754a06370d81259,4bf58dd8d48988d1e9931735,4bf58dd8d48988d1e8931735,4bf58dd8d48988d1e7931735,4d4b7104d754a06370d81259,5267e4d9e4b0ec79466e48d1,52e81612bcbc57f1066b79ef,4bf58dd8d48988d1f2931735,4bf58dd8d48988d18e941735,4bf58dd8d48988d137941735,5032792091d4c4b30a586d5c,507c8c4091d498d9fc8c67a9,4bf58dd8d48988d136941735,4d4b7105d754a06376d81259,4bf58dd8d48988d11f941735&v=20170323&m=swarm"






  router.post('/savedSearches', jsonParser, (req, res) => {
  // res.cookie('myName', 'searcher', { maxAge: 9000000, httpOnly: false });
  // console.log('Cookies', req.cookies);
  const requiredFields = ['url', 'name', 'address', 'city'];
  const venues = req.body.places;
  const term = req.body.term;
  const email = req.body.userEmail;
  var search = new searchRecord({
    term: term,
    searchedAt: new Date(),
    userEmail: email,
    results: venues
  });
 
     console.log(search);

    //   venues.forEach(function (venue) { 

    //   const item = new Search({
    //   url: venue.url,
    //   name: venue.name,
    //   address: venue.address,
    //   city: venue.city
    // });
    
     search.save(function (err) {
       // console.log(search)
       console.log(err);     

     });

   // });
     res.send(JSON.stringify('ok'));
   });

    
  

request(musicVenuesUrl, function(error, response, body) {
    if (!error && response.statuscode == 200) {

        var arr = JSON.parse(response.body);
        var obj = arr[0];
               

          res.send({
        redirectTo: '/savedSearches',
    
      });
    }
  });


   











module.exports = router;