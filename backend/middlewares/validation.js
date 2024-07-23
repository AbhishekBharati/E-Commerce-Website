const zod = require("zod");

const loginSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(4)
});

const signupSchema = zod.object({
  firstname: zod.string(),
  lastname: zod.string(),
  email: zod.string().email(),
  password: zod.string().min(4),
  phone: zod.string()
});

const loginValidation = async (req, res, next) => {
  const { email, password } = req.body;
  const login = loginSchema.safeParse({
    email: email,
    password: password
  });
  if (!login.success) {
    return res.status(401).json({
      msg: "Send the input in correct format"
    });
  }
  next();
}

const signupValidation = async (req, res, next) => {
  const { firstname, lastname, email, phone, password } = req.body;
  const signup = signupSchema.safeParse({
    firstname: firstname,
    lastname: lastname,
    email: email,
    phone: phone,
    password: password
  });
  if (!signup.success) {
    return res.status(401).json({
      msg: "Send the input in correct format"
    });
  }
  next();
}

module.exports = {
  loginValidation,
  signupValidation
}
