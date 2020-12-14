module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        name: String,
        country: String,
        fiscalNumber: String
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