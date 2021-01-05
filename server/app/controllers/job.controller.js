const db = require("../models");
const Job = db.jobs;

// Create and Save a new Job
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name && !req.body.experience) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
  
    // Create a Job
    const job = new Job({
        name: req.body.name,
        experience: req.body.experience,
        technology: req.body.technology
    });
  
    // Save Job in the database
    job.save(job).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Job."
        });
    });
};

// Retrieve all Jobs from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

    Job.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Jobs."
        });
      });
  };

// Find a single Job with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Job.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Job with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Job with id=" + id });
      });
  };

// Update a Job by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Job.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Job with id=${id}. Maybe Job was not found!`
          });
        } else res.send({ message: "Job was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Job with id=" + id
        });
      });
  };

// Delete a Job with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Job.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Job with id=${id}. Maybe Job was not found!`
        });
      } else {
        res.send({
          message: "Job was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Job with id=" + id
      });
    });
};

// Delete all Jobs from the database.
exports.deleteAll = (req, res) => {
    Job.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Jobs were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Jobs."
        });
      });
  };
// Find all with a specific name from Jobs 
exports.findSpecificName = (req, res) => {
  const name = req.params.name;
    Job.find({ name: name })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Jobs."
        });
      });
  };
// Find all with a specific experience from Jobs 
exports.findSpecificExperience = (req, res) => {
    const experience = req.params.experience;
      Job.find({ experience: experience })
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving Jobs."
          });
        });
    };