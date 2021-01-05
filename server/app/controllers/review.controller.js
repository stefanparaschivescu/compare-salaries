const db = require("../models");
const Review = db.reviews;

// Create and Save a new Review
exports.create = (req, res) => {
    // Validate request
    if (!req.body.user_id && !req.body.description && !req.body.mark) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
  
    // Create a Review
    const review = new Review({
        user_id: req.body.user_id,
        description: req.body.description,
        date: req.body.date,
        mark: req.body.mark 
    });
  
    // Save Review in the database
    review.save(review).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Review."
        });
    });
};

// Retrieve all Reviews from the database.
exports.findAll = (req, res) => {
    const description = req.query.description;
    var condition = description ? { description: { $regex: new RegExp(description), $options: "i" } } : {};

    Review.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Reviews."
        });
      });
  };

// Find a single Review with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Review.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Review with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500).send({ message: "Error retrieving Review with id=" + id });
      });
  };

// Update a Review by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Review.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Review with id=${id}. Maybe Review was not found!`
          });
        } else res.send({ message: "Review was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Review with id=" + id
        });
      });
  };

// Delete a Review with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Review.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Review with id=${id}. Maybe Review was not found!`
        });
      } else {
        res.send({
          message: "Review was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Review with id=" + id
      });
    });
};

// Delete all Reviews from the database.
exports.deleteAll = (req, res) => {
    Review.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Reviews were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Reviews."
        });
      });
  };
// Find all with a specific description from Reviews 
exports.findSpecificDescription = (req, res) => {
  const description = req.params.description;
    Review.find({ description: description })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Reviews."
        });
      });
  };