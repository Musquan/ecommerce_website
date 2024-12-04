const router = require("express").Router();
let Users = require("../models/user.model");

router.route("/").get((req, res) => {
  Users.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const phonenumber = req.body.phonenumber;
  const email = req.body.email;
  const password = req.body.password;
  const billingaddress = req.body.billingaddress;
  const shippingaddress = req.body.shippingaddress;

  const newUser = new Users({
    email,
    password,
    firstname,
    lastname,
    phonenumber,
    billingaddress,
    shippingaddress,
  });

  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Users.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/email").get((req, res) => {
  Users.findById(req.params.email)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Users.findById(req.params.id)
    .then((user) => {
      user.email = req.body.email;
      user.password = req.body.password;
      user.firstname = req.body.firstname;
      user.lastname = req.body.lastname;
      user.phonenumber = req.body.phonenumber;
      user.billingaddress = req.body.billingaddress;
      user.shippingaddress = req.body.shippingaddress;
      user
        .save()
        .then(() => res.json("User updated!"))
        .catch((err) => res.status(400).json("Error is: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;