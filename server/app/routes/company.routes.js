module.exports = app => {
    const companies = require("../controllers/company.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Company
    router.post("/", companies.create);
  
    // Retrieve all Companies
    router.get("/", companies.findAll);
  
    // Retrieve all Companies with specific name
    router.get("/name/:name", companies.findSpecificName);

    // Retrieve all Companies from a specific country
    router.get("/country/:country", companies.findSpecificCountry);

    // Retrieve all Companies from a specific country
    router.get("/country/:country/name/:name", companies.findSpecificCompany);

    // Retrieve a single Company with id
    router.get("/id/:id", companies.findOne);
  
    // Update a Company with id
    router.put("/id/:id", companies.update);
  
    // Delete a Company with id
    router.delete("/id/:id", companies.delete);
  
    // Delete all companies
    router.delete("/", companies.deleteAll);
  
    app.use('/api/companies', router);
  };