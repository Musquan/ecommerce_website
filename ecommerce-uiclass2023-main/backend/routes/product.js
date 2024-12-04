const router = require("express").Router();
let Product = require("../models/product.model");

router.route("/").get((req, res) => {
  Product.find()
    .then((products) => res.json(products))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/addProduct").post((req, res) => {
  const productName = req.body.productName;
  const productDescription = req.body.productDescription;
  const productPrice = Number(req.body.productPrice);
  const productRating = req.body.productRating;
  const productReview = req.body.productReview;
  const productCategory = req.body.productCategory;
  const productEmail = req.body.productEmail;

  const newProduct = new Product({
    productName,
    productPrice,
    productRating,
    productReview,
    productCondition,
    productCategory,
    productDescription,
    productEmail,
    productImage,
  });

  newProduct
    .save()
    .then(() => res.json("Product added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Product.findById(req.params.id)
    .then((product) => res.json(product))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then(() => res.json("Product deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Product.findById(req.params.id)
    .then((product) => {
      product.productName = req.body.productName;
      product.productDescription = req.body.productDescription;
      product.productPrice = Number(req.body.productPrice);
      product.productCondition = req.body.productCondition;
      product.productRating = req.body.productRating;
      product.productReview = req.body.productReview;
      product.productCategory = req.body.productCategory;
      product.productEmail = req.body.productEmail;

      product
        .save()
        .then(() => res.json("Product updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;