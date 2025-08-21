const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    require: true,
  },
  message: {
    type: String,
    require: true,
  },
});
const contacts = mongoose.model("contacts", newSchema);
module.exports = contacts;
