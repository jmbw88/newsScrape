var db = require("../models");
var axios = require("axios");

module.exports = function(app) {
  app.get("/", function(req, res) {
  db.Article.find({})
    .then(function(dbArticle) {
       res.render("index", {data: dbArticle});
       console.log(dbArticle)
    })
    .catch(function(err) {
      res.json(err);
    });

});


app.get("/saved", function(req, res) {
  console.log('go to saved articles');
    db.Article.find({})
      .then(function(dbArticle) {
         res.render("saved", {data: dbArticle});
         console.log(dbArticle)
      })
      .catch(function(err) {
        res.json(err);
      });
  
  });
};