const db = require("../models");
const Company = db.companies;

// Create and Save a new Company
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name && !req.body.country) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
  
    // Create a Company
    const company = new Company({
        name: req.body.name,
        country: req.body.country,
    });
  
    // Save Company in the database
    company.save(company).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Company."
        });
    });
};

// Retrieve all Companies from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

    Company.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Companies."
        });
      });
  };

// Find a single Company with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Company.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Company with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Company with id=" + id });
      });
  };

// Update a Company by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Company.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Company with id=${id}. Maybe Company was not found!`
          });
        } else res.send({ message: "Company was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Company with id=" + id
        });
      });
  };

// Delete a Company with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Company.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Company with id=${id}. Maybe Company was not found!`
        });
      } else {
        res.send({
          message: "Company was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Company with id=" + id
      });
    });
};

// Delete all Companies from the database.
exports.deleteAll = (req, res) => {
    Company.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Companies were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Companies."
        });
      });
  };
// Find all with a specific name from Companies 
exports.findSpecificName = (req, res) => {
  const name = req.params.name;
    Company.find({ name: name })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Companies."
        });
      });
  };
// Find all from a specific country from Companies 
exports.findSpecificName = (req, res) => {
    const country = req.params.country;
      Company.find({ country: country })
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving Companies."
          });
        });
    };