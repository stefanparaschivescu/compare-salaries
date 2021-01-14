module.exports = app => {
    const users = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    // Create a new User
    router.post("/", users.create);
  
    // Retrieve all Users
    router.get("/", users.findUser);

    // Retrieve all Users with specific password
    router.get("/location/:location", users.findSpecificLocation);

    // Retrieve all Users with specific password
    router.get("/name/:firstName/:lastName", users.findSpecificUserByName);
  
    router.get("/email/:email", users.findSpecificEmail);

    // Retrieve a single User with id
    router.get("/id/:id", users.findOne);
  
    // Update a User with id
    router.put("/id/:id", users.update);
  
    // Delete a User with id
    router.delete("/id/:id", users.delete);
  
    // Create a new User
    router.delete("/", users.deleteAll);
  
    app.use('/api/users', router);
  };