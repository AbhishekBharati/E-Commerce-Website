const jwt = require("jsonwebtoken");
require('dotenv').config();
const { PrismaClient } = require("@prisma/client");
const { hashPassword, verifyPassword } = require("../utility/bcrypt.js")

const prisma = new PrismaClient()
const secretKey = process.env.SECRET_KEY;

const loginCustomerController = async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findFirst({
    where: {
      email: email
    }
  })
  if (!user) {
    return res.status(401).json({
      msg: "Email or Password is Incorrect."
    })
  }
  const plainPassword = await verifyPassword(password, user.password)
  if (!plainPassword) {
    return res.status(401).json({
      msg: "Email or Password is Incorrect."
    });
  }
  const payload = { id: user.id, email: user.email, role: user.role };
  const token = jwt.sign(payload, secretKey);
  res.status(202).json({
    msg: "Logged in Successfully",
    token: token
  })
}

const signupCustomerController = async (req, res) => {
  const { firstname, lastname, email, phone, password } = req.body;
  const existingUser = await prisma.user.findFirst({
    where: {
      email: email
    }
  });
  if (existingUser) {
    return res.status(411).json({
      msg: "User Already exists"
    })
  }
  const hashedPassword = await hashPassword(password);
  const customer = await prisma.user.create({
    data: {
      firstname: firstname,
      lastname: lastname,
      email: email,
      phone: phone,
      role: "user",
      password: hashedPassword,
    }
  });
  const payload = { id: customer.id, email: customer.email, role: customer.role };
  const token = jwt.sign(payload, secretKey);
  res.status(200).json({
    msg: "User Created Successfully",
    token: token
  })
}

module.exports = {
  loginCustomerController,
  signupCustomerController
}
