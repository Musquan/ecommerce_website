const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  orderNo: {
    type: String,
    // required: true,
    unique: true,
    // trim: true,
  },
  orderDate: {
    type: String,
    //required: true,
    //trim: true,
  },
  userID: {
    type: String,
    //required: true,
    //trim: true,
  },
  transactionProducts: {
    type: String,
    //required: true,
    //trim: true,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;