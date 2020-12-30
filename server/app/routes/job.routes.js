module.exports = app => {
    const jobs = require("../controllers/job.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Job
    router.post("/", jobs.create);
  
    // Retrieve all Jobs
    router.get("/", jobs.findAll);
  
    // Retrieve all Jobs with a specific name
    router.get("/name/:name", jobs.findSpecificName);

    // Retrieve all Jobs with specific experience
    router.get("/experience/:experience", jobs.findSpecificExperience);
  
    // Retrieve a single Job with id
    router.get("/id/:id", jobs.findOne);
  
    // Update a Job with id
    router.put("/id/:id", jobs.update);
  
    // Delete a Job with id
    router.delete("/id/:id", jobs.delete);
  
    // Delete all Jobs
    router.delete("/", jobs.deleteAll);
  
    app.use('/api/jobs', router);
  };