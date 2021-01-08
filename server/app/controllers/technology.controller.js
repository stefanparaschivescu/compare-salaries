const db = require("../models");
const Technology = db.technologies;

// Create and Save a new Technology with inexistent name
exports.create = (req, res) => {
    const name = req.body.name.toLowerCase(); 
    // Validate request
    if (!name) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }

    //Increment the 'uses' if the object already exists
    //If not will create another object with that name
    var condition = {name: name};
    var update = {$inc: {uses: 1}};
    var options = { upsert: true};
    
    Technology.updateOne(condition, update, options)
    .then(data => {
        if (!data.nModified) {
          res.send({
            message: `Technology with name ${name} was created.`
          });
        } else res.send({ message: `Technology ${name} was updated successfully.` });
    })
    .catch(err => {
        res.status(500).send({
          message: "Error updating/creating Technology with name=" + name
        });
    });
};

// Retrieve all Technologies from the database.
exports.findAll = (req, res) => {
    const location = req.query.location;
    var condition = location ? { location: { $regex: new RegExp(location), $options: "i" } } : {};

    Technology.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Technologies."
        });
      });
  };

// Find a single Technology with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Technology.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Technology with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Technology with id=" + id });
      });
  };

// Update a Technology by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Technology.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Technology with id=${id}. Maybe Technology was not found!`
          });
        } else res.send({ message: "Technology was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Technology with id=" + id
        });
      });
  };

// Delete a Technology with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Technology.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Technology with id=${id}. Maybe Technology was not found!`
        });
      } else {
        res.send({
          message: "Technology was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Technology with id=" + id
      });
    });
};

// Delete all Technologies from the database.
exports.deleteAll = (req, res) => {
    Technology.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Technologies were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Technologies."
        });
      });
  };

// Find all with a specific name from Technologies 
exports.findSpecificName = (req, res) => {
    const name = req.params.name.toLowerCase();
      Technology.find({ name: name })
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving Technologies."
          });
        });
    };