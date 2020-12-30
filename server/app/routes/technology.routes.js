module.exports = app => {
    const technologies = require("../controllers/technology.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Technology
    router.post("/", technologies.create);
  
    // Retrieve all Technologies
    router.get("/", technologies.findAll);
  
    // Retrieve all Technologies with a specific name
    router.get("/:name", technologies.findSpecificName);
  
    // Retrieve a single Technology with id
    router.get("/:id", technologies.findOne);
  
    // Update a Technology with id
    router.put("/:id", technologies.update);
  
    // Delete a Technology with id
    router.delete("/:id", technologies.delete);
  
    // Delete all Technologies
    router.delete("/", technologies.deleteAll);
  
    app.use('/api/technologies', router);
  };