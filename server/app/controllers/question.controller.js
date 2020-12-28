const db = require("../models");
const Question = db.questions;

// Create and Save a new Question
exports.create = (req, res) => {
    // Validate request
    if (!req.body.question1 && !req.body.question2 && !req.body.question3 && !req.body.question4) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
  
    // Create a Question
    const question = new Question({
        question1: req.body.question1,
        question2: req.body.question2,
        question3: req.body.question3,
        question4: req.body.question4 
    });
  
    // Save Question in the database
    question.save(question).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Question."
        });
    });
};

// Retrieve all Questions from the database.
exports.findAll = (req, res) => {
    const question1 = req.query.question1;
    var condition = question1 ? { question1: { $regex: new RegExp(question1), $options: "i" } } : {};

    Question.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Questions."
        });
      });
  };

// Find a single Question with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Question.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Question with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500).send({ message: "Error retrieving Question with id=" + id });
      });
  };

// Update a Question by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Question.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Question with id=${id}. Maybe Question was not found!`
          });
        } else res.send({ message: "Question was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Question with id=" + id
        });
      });
  };

// Delete a Question with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Question.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Question with id=${id}. Maybe Question was not found!`
        });
      } else {
        res.send({
          message: "Question was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Question with id=" + id
      });
    });
};

// Delete all Questions from the database.
exports.deleteAll = (req, res) => {
    Question.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Questions were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Questions."
        });
      });
  };
// Find all with a specific answer for from Questions 
exports.findSpecificQuestion = (req, res) => {
  const question1 = req.params.question1;
    Question.find({ question1: question1 })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Questions."
        });
      });
  };