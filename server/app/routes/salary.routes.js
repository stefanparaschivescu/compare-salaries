module.exports = app => {
    const salaries = require("../controllers/salary.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Salary
    router.post("/", salaries.create);
  
    // Retrieve all Salaries
    router.get("/", salaries.findAll);
  
    // Retrieve all Salaries with specific location
    router.get("/:location", salaries.findSpecificLocation);
    
    // Retrieve all Salaries with specific salary
    router.get("/:salary", salaries.findSpecificSalary);
  
    // Retrieve a single Salary with id
    router.get("/:id", salaries.findOne);
  
    // Update a Salary with id
    router.put("/:id", salaries.update);
  
    // Delete a Salary with id
    router.delete("/:id", salaries.delete);
  
    // Create a new Salary
    router.delete("/", salaries.deleteAll);
  
    app.use('/api/salaries', router);
  };