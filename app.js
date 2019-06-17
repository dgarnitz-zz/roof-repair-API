var express = require('express');
var cors = require('cors')
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

app.post('/',function(req,res){
    console.log(req.body);
    res.setHeader('Content-Type', 'application/json');
    res.json({ "price": 20 });
  });

  app.listen(5000,function(){
    console.log("Started on PORT 5000");
  })
  