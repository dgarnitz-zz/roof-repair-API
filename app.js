var express = require('express');
var cors = require('cors')
var bodyParser = require("body-parser");
var app = express(); 
const multer = require('multer');
const spawn = require("child_process").spawn;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

app.listen(5000,function(){
  console.log("Started on PORT 5000");
})


//Method for debugging the express application's interaction with the python script
const logOutput = () => (data) => console.log(`${data}`)

// Method for calling machine learning
var processImage = (location, season) => {
  let arg1 = processSeason(season);
  let arg2 = processLocation(location);
  
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn('python',["./controller.py", arg1, arg2]);
    
    const out = []
    pythonProcess.stdout.on("data", data =>{
      out.push(data.toString());
      logOutput()(data);
      resolve(data);
    });

    process.stderr.on("data", data => {
      err.push(data.toString());
      logOutput()(data);
    });

    process.on('exit', (code, signal) => {
      logOutput()(`${code} (${signal})`)
      if (code === 0) {
        resolve(out);
      } else {
        reject(new Error(err.join('\n')))
      }
    });
  });
}

var processSeason= (season) => {
  switch(season) {
    case "winter":
      return [1,0,0,0]
    case "spring":
      return [0,1,0,0] 
    case "summer":
      return [0,0,1,0]
    case "autumn":
      return [0,0,0,1]
    default:
      return [0,0,1,0]
  }
}

var processLocation = (location) => {
  return (location === "Fife") ? 1 : 0; 
}


// Set storage for pictures
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, 'test.jpg')
  }
})
 
var upload = multer({ storage: storage })

//post request to handle the inbound image and form data
app.post('/upload/photo', upload.single('myImage'), function(req, res, next){
  const file = req.file;

  // access the text data from the form
  let location = req.body.location
  let season = req.body.season

  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
  processImage(location, season).then(output => { //You must activate the python virtual environment or this will not work
    res.setHeader('Content-Type', 'application/json');
    res.json({ "price": `${output}`});
  })

});

//get route to handle reinforcement learning
app.get('/reinforcementLearning', function (req, res) {
  console.log(`The previous estimate was ${req.query.estimate}. The model will be updated to account for`)
  res.sendStatus(200)
})