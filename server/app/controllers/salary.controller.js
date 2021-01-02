const db = require("../models");
const Salary = db.salaries;

// Create and Save a new Salary
exports.create = (req, res) => {
    // Validate request
    if (!req.body.salary && !req.body.currency && !req.body.location) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
  
    // Create a Salary
    const salary = new Salary({
        job: req.body.job,
        company: req.body.company,
        location: req.body.location,
        PFA: req.body.PFA,
        salary: req.body.salary,
        currency: req.body.currency,
        date: req.body.date
    });
  
    // Save Salary in the database
    salary.save(salary).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Salary."
        });
    });
};

// Retrieve all Salaries from the database.
exports.findAll = (req, res) => {
    const location = req.query.location;
    var condition = location ? { location: { $regex: new RegExp(location), $options: "i" } } : {};

    Salary.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Salaries."
        });
      });
  };

// Find a single Salary with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Salary.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Salary with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Salary with id=" + id });
      });
  };

// Update a Salary by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Salary.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Salary with id=${id}. Maybe Salary was not found!`
          });
        } else res.send({ message: "Salary was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Salary with id=" + id
        });
      });
  };

// Delete a Salary with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Salary.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Salary with id=${id}. Maybe Salary was not found!`
        });
      } else {
        res.send({
          message: "Salary was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Salary with id=" + id
      });
    });
};

// Delete all Salaries from the database.
exports.deleteAll = (req, res) => {
    Salary.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Salaries were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Salaries."
        });
      });
  };
// Find all from a specific location from Salaries 
exports.findSpecificLocation = (req, res) => {
  const location = req.params.location;
    Salary.find({ location: location })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Salaries."
        });
      });
  };
// Find all with a specific salary from Salaries 
exports.findSpecificSalary = (req, res) => {
    const salary = req.params.salary;
      Salary.find({ salary: salary })
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving Salaries."
          });
        });
    };