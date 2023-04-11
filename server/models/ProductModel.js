const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  image: {
    type: String,
  },
  rating: {
    type: Number,
    default: 5,
  },
  price: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
  },
  countInStock: {
    type: Number,
    default: 0,
  },
});

const Product = mongoose.model("Products", productSchema);
module.exports = Product;
