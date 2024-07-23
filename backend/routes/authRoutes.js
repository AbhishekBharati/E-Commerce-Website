const express = require("express");
const router = express.Router();
const { loginCustomerController, signupCustomerController } = require("../controllers/authController");
const { loginValidation, signupValidation } = require("../middlewares/validation");

router.post("/loginCustomer", loginValidation, loginCustomerController);
router.post("/signupCustomer", signupValidation, signupCustomerController);

module.exports = router;
