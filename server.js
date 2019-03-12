var express = require("express");

var mongoose = require("mongoose");
var exphbs = require("express-handlebars");

var PORT = process.env.PORT || 8080;


var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scrape";

mongoose.connect(MONGODB_URI);

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

require("./routes/api-routes")(app);
require("./routes/html-routes")(app);


app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});