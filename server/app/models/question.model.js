const { ObjectID } = require("mongodb");

module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        user_id: ObjectID,
        question1: String,
        question2: String,
        question3: String,
        question4: String
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Questions = mongoose.model("questions", schema);
    return Questions;
  };