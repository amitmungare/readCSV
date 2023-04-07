
// require express for setting up the express server
const express = require('express');
// Setup the Router
const router = express.Router();

// Setting path for controller function
const csv = require('../controllers/csv');

// Setting controller function to a route, to post new file
router.post('/upload',csv.uploadFile);   
// get the csv file 
router.get('/open',csv.getFile);        
// delete the csv file 
router.get('/delete',csv.deleteFile);    
// exporting the router
module.exports = router;


