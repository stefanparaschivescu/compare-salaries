const { ObjectID } = require("mongodb");

module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        firstName: String,
        lastName: String,
        email: String,
        password: String,
        completedTask: Boolean,
        salaries: [ObjectID],
        reviews: [ObjectID],
        interviews: [ObjectID],
        sex: Boolean,
        location: String,
        phoneNumber: String,
        bestSkills: [ObjectID], //technologies that he is best at
        questions: ObjectID
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const User = mongoose.model("users", schema);
    return User;
  };