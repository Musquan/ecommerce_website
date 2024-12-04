const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    //required: true,
    // unique: true,
    // trim: true,
  },
  password: {
    type: String,
    //required: true,
    // unique: true,
    // trim: true,
  },
  firstname: {
    type: String,
    //required: true,
    // trim: true,
  },
  lastname: {
    type: String,
    //required: true,
    // trim: true,
  },
  phonenumber: {
    type: String,
    //required: true,
    //trim: true,
  },
  billingaddress: {
    type: String,
    //required: true,
    // trim: true,
  },
  shippingaddress: {
    type: String,
    //required: true,
    // trim: true,
  },
});

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
