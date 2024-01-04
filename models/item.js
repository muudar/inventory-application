const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  numberInStock: {
    type: Number,
    required: true,
  },
});

itemSchema.virtual("url").get(function () {
  return "/items/" + this._id;
});

module.exports = mongoose.model("Item", itemSchema);
