
var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");

// Routes
// =============================================================
module.exports = function(app) {
app.get("/scrape", function(req, res) {
  console.log("scrape it now")
  axios.get("https://www.npr.org/").then(function(response) {
    var $ = cheerio.load(response.data);
    $("h3.title").each(function(i, element) {
      var result = {};
      result.title = $(element).text();
      result.summary = $(element).parent().next().find('p').text();
      result.link = $(element).parent().attr('href');
      console.log(result)
      db.Article.create(result)
        .then(function(dbArticle) {
          console.log(dbArticle);
        })
        .catch(function(err) {
          console.log(err);
        });
    });
    res.send("Scrape Complete");
  });
});



app.delete("/delete", function(req, res) {
  console.log("delete it all now")
    db.Article.deleteMany({})
      .then(function(dbArticle) {
         res.render("index");
        console.log(dbArticle)
      })
      .catch(function(err) {
        res.json(err);
      });
    });



    app.put("/save/:id", function(req, res) {
      console.log("save it now")
      console.log(req.params.id)
        db.Article.findOneAndUpdate({ _id: req.params.id }, { saved: true })
          .then(function(dbArticle) {
             res.render("index");
            console.log(dbArticle)
          })
          .catch(function(err) {
            res.json(err);
          });
        });

        app.put("/remove/:id", function(req, res) {
          console.log("remove it now")
          console.log(req.params.id)
            db.Article.findOneAndUpdate({ _id: req.params.id }, { saved: false })
              .then(function(dbArticle) {
                 res.render("index");
                console.log(dbArticle)
              })
              .catch(function(err) {
                res.json(err);
              });
            });

app.get("/articles", function(req, res) {
  db.Article.find({})
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});


app.get("/articles/:id", function(req, res) {
  db.Article.findOne({ _id: req.params.id })
    .populate("note")
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});


app.post("/articles/:id", function(req, res) {
  db.Note.create(req.body)
    .then(function(dbNote) {
      return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
    })
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});

};