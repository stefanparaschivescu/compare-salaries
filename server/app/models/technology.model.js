const { ObjectID } = require("mongodb");

module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        name: String,
        uses: { type: Number, default: 1 }
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Technology = mongoose.model("technologies", schema);
    return Technology;
  };