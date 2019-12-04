// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Reservation array
var reservationsArray = [
  {
    customerName: "",
    customerEmail: "",
    customerId: "",
    phoneNumber: ""
  }
];

//Tables array
var tablesArray = [];

//Waitlist array
var waitlistArray = [];

// Routes
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/tables.html"));
});

app.get("/reservations", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/reservations.html"));
});

// Displays all tables and reservations
app.get("/api/tables", function(req, res) {
  return res.json(tablesArray);
});

app.get("/api/waitlist", function(req, res) {
  return res.json(waitlistArray);
});



// Create New Reservations - takes in JSON input
app.post("/api/reserve", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newReservation = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();

  console.log(newReservation);
  if(tablesArray.length<5){
    tablesArray.push(newReservation);
  }else{
    waitlistArray.push(newReservation);
  }

  res.json(newReservation);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
