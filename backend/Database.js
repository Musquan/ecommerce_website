require("dotenv").config();
const mongoose = require("mongoose");

const uri = process.env.ATLAS_URI;

const connectDB = async() => {
    try {
        await mongoose.connect(uri);
        console.log("The server is running!! Hurray");
    } catch (error){
        console.log("Something is wrong with the server");
    }
}

module.exports = connectDB;