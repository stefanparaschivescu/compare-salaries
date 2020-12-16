const { ObjectID } = require("mongodb");

module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        name: String,
        country: String,
        reviews: [ObjectID],
        interviews: [ObjectID],
        salaries: [ObjectID]
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Company = mongoose.model("companies", schema);
    return Company;
  };