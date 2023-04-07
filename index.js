// require express for setting up the express server
const express = require('express');
// set up the port number
const port = process.env.PORT || 8000;
const path = require('path');
const fs = require('fs');
// using express
const app = express();         
// Setting view engine as ejs
app.set('view engine','ejs');  
// Setting path for views
app.set('views',path.join(__dirname,'views'));  
app.use(express.urlencoded({extended: true})); 
// getting the static files 
app.use(express.static('assets'));    
// getting the folder to upload csv files 
app.use('/uploads',express.static(__dirname+'/uploads'));   

// Redirect all to index.js inside routes directory
app.use('/',require('./routes/index'));    

// Setting express to listen to port 8000
app.listen(port,function(error){
    if(error){
        console.log("Error in starting the server",error);
        return;
    }
    // delete the csv file when setting a new server
   try {
      var csvfile = fs.readdirSync(path.join(__dirname,'/uploads'));
    }catch(e){
      return;
    }
    // if there is a csv file in uploads folder then delete
    if (csvfile.length > 0)
      for (let i = 0; i < csvfile.length; i++) {
        var csvPath = path.join(__dirname,'/uploads',csvfile[i]);
        if (fs.statSync(csvPath).isFile())
          fs.unlinkSync(csvPath);
    }
    // server started running successfully
    console.log("server is running on port number ",port);
});