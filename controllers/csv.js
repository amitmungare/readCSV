// require multer to upload files
const multer = require('multer');
const path = require('path');     
// csv parser to conver csv data into json format
const csv = require('csv-parser'); 
const fs = require('fs');
// array of csv file name
const fileName = [];   


//using multer to store csv files
const store = multer.diskStorage({
    // path and name
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'../','/uploads'));
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  });

//function checks the file type is csv or not 
function checkFileType (req, file, cb) {
    if(file.mimetype == 'text/csv') cb(null,true);
    else cb(null,false);  
}

// setting multer 
const uploadFile = multer({storage:store,fileFilter:checkFileType}).single('uploaded_file');

//putting the file in the uploads folder
module.exports.uploadFile = function(req,res){
  uploadFile(req,res,function(error){
        if(error instanceof multer.MulterError)return;
        else if(error)return;
        else if(req.file)fileName.push(req.file.filename);
        
        return res.redirect('back');
    });
}

//returning the array of file names
module.exports.fileName = function(){
  return fileName;
}

//getting the csv file data and displaying it
module.exports.getFile = function(req,res){
  // array to store the json data 
  const csvData = [];             
  const i = req.query.index;
  fs.createReadStream(path.join(__dirname,'../','/uploads',fileName[i]))
  .pipe(csv())
  .on('data', (data) => csvData.push(data))
  .on('end', () => {
    return res.render('csvreader',{
      csvData: csvData
    });
  });
}

//delete the csv file
module.exports.deleteFile = function(req,res){
  let i = req.query.index;
  try { var csvFile = fs.readdirSync(path.join(__dirname,'..','/uploads')); }
  catch(e) { return; }
  // checking if there are files or not 
    if (csvFile.length > 0){
        var csvFilePath = path.join(__dirname,'..','/uploads',fileName[i]);
        if (fs.statSync(csvFilePath).isFile())
          fs.unlinkSync(csvFilePath);
    }
    fileName.splice(i,1);
    return res.redirect('back');
}