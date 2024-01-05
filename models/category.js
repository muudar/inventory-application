const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 20,
  },
});

module.exports = mongoose.model("Category", categorySchema);
