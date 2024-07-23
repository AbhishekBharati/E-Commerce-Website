const express = require("express");
const router = express.Router();
const { loginCustomerController, signupCustomerController } = require("../controllers/authController")

router.post("/loginCustomer", loginCustomerController);
router.post("/signupCustomer", signupCustomerController);

module.exports = router;
