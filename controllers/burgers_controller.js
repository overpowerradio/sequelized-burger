var express = require("express");
var router = express.Router();
var burger = require("../models/burger.js");
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the posts
  router.get("/", function(req, res) {
    db.Burger.findAll({})
    .then(function(data) {
    var hbsObject = {
      burger: data
    };
    
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
  });

  // Get route for returning posts of a specific category
  router.get("/api/posts/flavor/:burgerName", function(req, res) {
    db.Burger.findAll({
      where: {
        category: req.params.burgerName
      }
    })
    .then(function(burgerRes) {
      res.json(burgerRes);
    });
  });

  // Get rotue for retrieving a single post
  router.get("/api/burgers/:id", function(req, res) {
    db.Post.findOne({
      where: {
        id: req.params.id
      }
    })
    .then(function(burgerRes) {
      res.json(burgerRes);
    });
  });

  // POST route for saving a new post
  router.post("/api/burgers", function(req, res) {
    console.log(req.body);
    db.Burger.create({
      burger_name: req.body.title,
        })
    .then(function(burgerRes) {
      res.json(burgerRes);
    });
  });

  // DELETE route for deleting posts
  router.delete("/api/burgers/:id", function(req, res) {
    db.Burger.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(function(burgerRes) {
      res.json(burgerRes);
    });
  });

  // PUT route for updating posts
  router.put("/api/burgers", function(req, res) {
    db.Burger.update(req.body,
      {
        where: {
          id: req.body.id
        }
      })
    .then(function(burgerRes) {
      res.json(burgerRes);
    });
  });
};
