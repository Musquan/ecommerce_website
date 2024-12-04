const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// useNewUrlParser -> deal with the deprecation of the function from the updates
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const usersRouter = require('./routes/users');

app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});


/*
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const productRouter = require("./models/product.model");
const userRouter = require("./models/user.model");
const transactionRouter = require("./models/transaction.model");
const connectDB = require("./Database")
connectDB();


const app = express();
// extended false is saying we are working with simple string
app.use(express.json({extended: false}));

// hanlde two cross platform
const cors = require("cors");
app.use(cors());

//test case 
app.get("/readfromserver", (req, res) => {
  res.json({message: "Hey man from server"});
})

app.post("/writetodatabase", async (req, res) => {
  try {
    const {content} = req.body;
    const newData = new DataModel({ content });
    await newData.save();
    res.json({message: "Data saved successfully!!"})
  } catch (error) {
    console.log("This is an error message that should be printed", error.message);
    res.status(500).send("Server error while saving data!!!")
  }
})

// API class go here 
app.use("/products", productRouter);
app.use("/users", userRouter);
app.use("/transactions", transactionRouter);


const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
*/




/*
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const productRouter = require("./routes/product.js");
const userRouter = require("./routes/users.js");
const transactionRouter = require("./routes/transactions.js");


app.use("/products", productRouter);
app.use("/users", userRouter);
app.use("/transactions", transactionRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
*/