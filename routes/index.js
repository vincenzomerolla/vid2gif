var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

var multer = require('multer');
//var gifify = require('gifify');
var gify = require('gify')

var streamifier = require('streamifier');

var flow = require('../helpers/flow.js')('tmp');

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

router.get('/download', function(req, res, next) {
  console.log(req.query)
  var file = req.query.file;
  res.download(UPLOAD_DIR + file, function (err) {
    if (err) next(err);
    else console.log('Sent: ', file);
  })
})

// router.get('/download/:identifier', function(req, res) {
//   flow.write(req.params.identifier, res);
// });


// Handle status checks on chunks through Flow.js
// router.get('/upload', function(req, res) {
//   flow.get(req, function(status, filename, original_filename, identifier) {
//     if (status == 'found') status = 200;
//     else status = 404;
//     res.status(status).send();
//   });
// });


router.post('/upload', multer(), function(req, res, next) {
  console.log('POST', req.files.file);

  var file = req.files.file;
  var dest = UPLOAD_DIR + file.name.replace(/\.[^/.]+$/, '') + '.gif';

  // //var gif = fs.createWriteStream(file.path.replace(/\.[^/.]+$/, '') + '.gif');
  // //var readableStream = streamifier.createReadStream(file.buffer);

  // //gifify(readableStream, {}).pipe(gif);
  gify(file.path, dest, function (err) {
    if (err) next(err);

    // res.download(dest, path.basename(dest), function (err) {
    //   if (err) next(err);
    //   else console.log('Sent: ', dest, res);
    // });
    res.send(path.basename(dest));
  })
  // flow.post(req, function(status, filename, original_filename, identifier) {
  //   console.log('POST', status, original_filename, identifier);
  //   res.status(status).send();
  // });

});


module.exports = router;
