// require csv controller
const csv = require('./csv');

// get the csv file names
const names = csv.fileName;
const arr = names();   

// exporting file name to home
module.exports.home = function(req,res){
    return res.render('home',{
        files: arr
    });
}
