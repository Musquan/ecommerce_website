const router = require("express").Router();
let Transaction = require("../models/transaction.model");


router.route("/").get((req, res) => {
    Transaction.find()
    .then((transactions) => res.json(transactions))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/addTransaction").post((req, res) => {
  const orderNumber = req.body.orderNumber;
  const orderDate = req.body.orderDate;
  const userID = req.body.userID;
  const transactionProducts = req.body.transactionProducts;

  const newTransaction = new Transaction({
    orderNumber, 
    orderDate,
    userID,
    transactionProducts,
  });

  newTransaction
    .save()
    .then(() => res.json("Transaction added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
    Transaction.findById(req.params.id)
    .then((transaction) => res.json(transaction))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
    Transaction.findByIdAndDelete(req.params.id)
    .then(() => res.json("Transaction deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
    Transaction.findById(req.params.id)
    .then((transaction) => {
      transaction.orderNumber = req.body.orderNumber;
      transaction.orderDate = req.body.orderNumber;
      transaction.userID = req.body.orderNumber;
      transaction.transactionProducts = req.body.transactionProducts;
      transaction
        .save()
        .then(() => res.json("Transaction updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;