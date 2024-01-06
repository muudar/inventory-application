const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 20,
  },
});

categorySchema.virtual("url").get(function () {
  return "/category/" + this._id;
});

module.exports = mongoose.model("Category", categorySchema);
