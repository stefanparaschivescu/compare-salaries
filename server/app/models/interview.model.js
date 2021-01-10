const { ObjectID } = require("mongodb");

module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        user_id: ObjectID,
        company: ObjectID,
        opinion: String,
        difficulty: String,
        questions: String,
        time: Number,
        date: Date
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Interview = mongoose.model("interviews", schema);
    return Interview;
  };