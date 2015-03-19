var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

var multer = require('multer');
//var gifify = require('gifify');
var gify = require('gify')

var streamifier = require('streamifier');

var TEMP_DIR = './tmp/'
var UPLOAD_DIR = './uploads/';

/* GET home page. */
router.get('/', function(req, res, next) { 
  res.render('index', { title: 'vid2gif' });
});


var config = {
  dest: TEMP_DIR,
  //inMemory: true
};


function removeExtension(filename){
  var lastDotPosition = filename.lastIndexOf('.');
  if (lastDotPosition === -1) return filename;
  return filename.substr(0, lastDotPosition);
} 

router.get('/download/:file', function(req, res, next) {
  var file = req.params.file + '.gif';
  res.download(UPLOAD_DIR + file, function (err) {
    if (err) next(err);
    else console.log('Sent: ', file);
  })
})


router.post('/upload', multer(config), function(req, res, next) {
  console.log('POST', req.files.file);
  
  var file = req.files.file;
  file.name = removeExtension(file.name);
  var dest = UPLOAD_DIR + file.name + '.gif';

  // var gif = fs.createWriteStream(file.path.replace(/\.[^/.]+$/, '') + '.gif');
  // var readableStream = streamifier.createReadStream(file.buffer);

  //gifify(readableStream, {}).pipe(res);
  gify(file.path, dest, function (err) {
    if (err) next(err);
    res.send(file.name);
  })

});


module.exports = router;
