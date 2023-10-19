
// create an express app
const bodyParser = require("body-parser")
const express = require("express")
const app = express()
require('dotenv').config()
require('body-parser')

// use the express-static middleware
app.use(express.static("public"))

app.use((req, res, next) => {
  let string = req.method + " " + req.path + " - " + req.ip;
  console.log(string);
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// define the first route
app.get("/", (req, res) => {
  res.send("./public/index.html")
})
app.get("/json", (req, res) => {
  res.send({ "message": process.env.MESSAGE_STYLE })
})

// app.get('/test', (req, res) => {
//   res.send(req.body);
// });



app.get('/name', (req, res) => {
  let firstName = req.query.first;
  let lastName = req.query.last;

  res.json({ "first": firstName, "last": lastName, 'req': `${res.body}` });

});

app.post("/name", function (req, res) {
  // Handle the data in the request
  var string = req.body.first + " " + req.body.last;
  res.json({ name: string });
  console.log(string)
});



app.get('/now', function (req, res, next) {
  req.now = new Date().toString(); // Hypothetical synchronous operation
  next();
}, function (req, res) {
  res.send({ time: req.now });
});

app.get('/:word/echo', (req, res) => {
  res.send({ "echo": req.params.word })
});

// absolutePath = __dirname + './public/index.html'


// start the server listening for requests
app.listen(process.env.PORT || 3000,
  () => console.log("Server is running..."));




















module.exports = app;
