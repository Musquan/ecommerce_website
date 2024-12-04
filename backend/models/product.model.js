const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  productName: {
    type: String,
    //required: true,
  },
  productPrice: {
    type: Number,
    //required: true,
  },
  productRating: {
    type: String,
    //required: true,
  },
  productReview: {
    type: String,
    //required: true,
  },
  productCategory: {
    type: String,
    //required: true,
  },
  productDescription: {
    type: String,
    //required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;