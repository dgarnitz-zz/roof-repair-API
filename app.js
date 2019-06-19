var express = require('express');
var cors = require('cors')
var bodyParser = require("body-parser");
var app = express(); 
const multer = require('multer');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
 
var upload = multer({ storage: storage })

// ROUTES
// app.get('/',function(req,res){
//   res.sendFile(__dirname + '/index.html');
 
// });

app.post('/upload/photo', upload.single('myImage'), function(req,res, next){
    const file = req.file;

    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }
      // res.send(file)

    res.setHeader('Content-Type', 'application/json');
    res.json({ "price": 20 });
  });

  app.listen(5000,function(){
    console.log("Started on PORT 5000");
  })
  