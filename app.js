var express = require('express');
var cors = require('cors')
var bodyParser = require("body-parser");
var app = express(); 
const multer = require('multer');
const spawn = require("child_process").spawn;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

const logOutput = (name) => (data) => console.log(`[${name}] ${data}`)
// Method for calling machine learning
var processImage = () => {
  let arg1 = 20;
  //const pythonProcess = spawn('python',["./test.py", arg1]);
  
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn('python',["./test.py", arg1]);
    
    const out = []
    pythonProcess.stdout.on("data", data =>{
      out.push(data.toString());
      logOutput('stdout')(data);
      //console.log(data);
    });

    process.stderr.on("data", data => {
      err.push(data.toString());
      logOutput('stderr')(data);
    });

    process.on('exit', (code, signal) => {
      logOutput('exit')(`${code} (${signal})`)
      if (code === 0) {
        resolve(out);
      } else {
        reject(new Error(err.join('\n')))
      }
    });
  });
}

(async () => {
  try {
    const output = await processImage()
    logOutput('main')(output)
    process.exit(0)
  } catch (e) {
    console.error(e.stack);
    process.exit(1);
  }
})();

// var processImage = () => {
//   let arg1 = 20;
//   const pythonProcess = spawn('python',["./test.py", arg1]);
//   //Listen for data from python script
//   pythonProcess.stdout.on('data', (data) => {
//     // Do something with the data returned from python script

//     //console.log("logging data", data.toString())
//     return data.toString()

//   });
// }

// Set storage for pictures
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
// get request for testing
// app.get('/',function(req,res){
//   res.sendFile(__dirname + '/index.html');
 
// });

//post request to handle the inbound image
app.post('/upload/photo', upload.single('myImage'), function(req,res, next){
    const file = req.file;

    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }

    // Method for initiating analysis of the image
    processImage();

    res.setHeader('Content-Type', 'application/json');
    res.json({ "price": 20 });
  });

  app.listen(5000,function(){
    console.log("Started on PORT 5000");

    //remove this 
    var test = processImage(); 
    console.log("testing again", test);
  })
  