const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});
const requests = mongoose.model("requests", newSchema);
module.exports = requests;
