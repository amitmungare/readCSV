// require express for setting up the express server
const express = require('express');
// Setup the Router
const router = express.Router();
// Setting path for controller function
const home = require('../controllers/home');
// Setting controller function to a route
router.get('/',home.home);    
// Route all requests starting with '/csv' to csv.js file
router.use('/csv',require('./csv'));  
// exporting the router
module.exports = router;