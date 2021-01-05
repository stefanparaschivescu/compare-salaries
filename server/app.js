const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:3001"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({
    extended:true
}));


// connect method
// const db = require("./app/models");
// const client = new MongoClient(db.url, { useNewUrlParser: true, useUnifiedTopology: true })
// .then(() => {
//     console.log("Connected to the database!");
// }).catch(err => {
//     console.log("Cannot connect to the database!", err);
//     process.exit();
// });

const db = require("./app/models");
console.log(db);
db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log("Connected to the database!");
  }).catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.send('<h1>Welcome to compareIT application.</h1>');
});

require("./app/routes/user.routes")(app);
require("./app/routes/salary.routes")(app);
require("./app/routes/review.routes")(app);
require("./app/routes/question.routes")(app);
require("./app/routes/interview.routes")(app);
require("./app/routes/company.routes")(app);
require("./app/routes/job.routes")(app);
require("./app/routes/technology.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});