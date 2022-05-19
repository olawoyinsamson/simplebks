const express = require("express");
var session = require("express-session");
var controller = require("./routes/controller");
var bodyParser = require("body-parser");


var app = express();
app.use(express.json());





// Body parser middle ware
// Body Parser Milddle ware
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//SESSION MIDDLE WARE
app.use(session({
    secret : 'keybaord cat',
    resave : false,
    saveUninitialized : true,
    cookie : { maxAge: 60 * 60 * 1000 }
  }))

  var port  = 3000;

  app.use("/",controller);

  app.listen(process.env.PORT || port, function(){
      console.log("Server started at port "+ port);
  })