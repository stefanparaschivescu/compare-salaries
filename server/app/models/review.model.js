const { ObjectID } = require("mongodb");

module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        user_id: ObjectID,
        description: String,
        company: ObjectID,
        date: Date,
        mark: Number
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Review = mongoose.model("reviews", schema);
    return Review;
  };