const { ObjectID } = require("mongodb");

module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        job: ObjectID,
        company: ObjectID,
        location: String,
        PFA: Boolean,
        salary: Number,
        currency: String,
        date: Date
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Salary = mongoose.model("salaries", schema);
    return Salary;
  };