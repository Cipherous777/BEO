const mongoose = require("mongoose");
const schema = mongoose.Schema;

const newSchema = new schema({
  title: {
    type: String,
  },
  message: {
    type: String,
  },
});
module.exports = ("adminSchema", newSchema);
