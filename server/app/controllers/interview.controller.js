const db = require("../models");
const Interview = db.interviews;

// Create and Save a new Interview
exports.create = (req, res) => {
    // Validate request
    if (!req.body.user_id && !req.body.opinion && !req.body.difficulty && !req.body.questions && !req.body.time) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
    if(req.body.date) {
        var date = req.body.date;
    }
  
    // Create a Interview
    const interview = new Interview({
        user_id: req.body.user_id,
        opinion: req.body.opinion,
        difficulty: req.body.difficulty,
        questions: req.body.questions,
        time: req.body.time,
        date: req.body.date ? Date.parse(req.body.date) : {}
    });
  
    // Save Interview in the database
    interview.save(interview).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Interview."
        });
    });
};

// Retrieve all Interviews from the database.
exports.findAll = (req, res) => {
    const opinion = req.query.opinion;
    var condition = opinion ? { opinion: { $regex: new RegExp(opinion), $options: "i" } } : {};

    Interview.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Interviews."
        });
      });
  };

// Find a single Interview with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Interview.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Interview with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500).send({ message: "Error retrieving Interview with id=" + id });
      });
  };

// Update a Interview by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Interview.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Interview with id=${id}. Maybe Interview was not found!`
          });
        } else res.send({ message: "Interview was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Interview with id=" + id
        });
      });
  };

// Delete a Interview with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Interview.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Interview with id=${id}. Maybe Interview was not found!`
        });
      } else {
        res.send({
          message: "Interview was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Interview with id=" + id
      });
    });
};

// Delete all Interviews from the database.
exports.deleteAll = (req, res) => {
    Interview.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Interviews were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Interviews."
        });
      });
  };
// Find all with a specific opinion for from Interviews 
exports.findSpecificOpinion = (req, res) => {
  const opinion = req.params.opinion;
    Interview.find({ opinion: opinion })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Interviews."
        });
      });
  };