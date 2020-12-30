module.exports = app => {
    const reviews = require("../controllers/review.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Review
    router.post("/", reviews.create);
  
    // Retrieve all Reviews
    router.get("/", reviews.findAll);
  
    // Retrieve all Reviews with specific description of the review
    router.get("/:description", reviews.findSpecificDescription);
  
    // Retrieve a single Review with id
    router.get("/:id", reviews.findOne);
  
    // Update a Review with id
    router.put("/:id", reviews.update);
  
    // Delete a Review with id
    router.delete("/:id", reviews.delete);
  
    // Create a new Review
    router.delete("/", reviews.deleteAll);
  
    app.use('/api/reviews', router);
  };