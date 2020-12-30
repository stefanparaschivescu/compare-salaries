module.exports = app => {
    const interviews = require("../controllers/interview.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Interview
    router.post("/", interviews.create);
  
    // Retrieve all Interviews
    router.get("/", interviews.findAll);
  
    // Retrieve all Interviews with specific opinion
    router.get("/:opinion", interviews.findSpecificOpinion);
  
    // Retrieve a single Interview with id
    router.get("/:id", interviews.findOne);
  
    // Update a Interview with id
    router.put("/:id", interviews.update);
  
    // Delete a Interview with id
    router.delete("/:id", interviews.delete);
  
    // Create a new Interview
    router.delete("/", interviews.deleteAll);
  
    app.use('/api/interviews', router);
  };