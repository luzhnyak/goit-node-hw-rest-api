// Registration request
// POST /users/register
// Content-Type: application/json
// RequestBody: {
//   "email": "example@example.com",
//   "password": "examplepassword"
// }
// Registration validation error
// Status: 400 Bad Request
// Content-Type: application/json
// ResponseBody: <Помилка від Joi або іншої бібліотеки валідації>
// Registration conflict error
// Status: 409 Conflict
// Content-Type: application/json
// ResponseBody: {
//   "message": "Email in use"
// }
// Registration success response
// Status: 201 Created
// Content-Type: application/json
// ResponseBody: {
//   "user": {
//     "email": "example@example.com",
//     "subscription": "starter"
//   }
// }

const { User } = require("../models/user");
const { HttpError, ctrlWrapper } = require("../helpers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ============================== Get current User
const getCurrentUser = async (req, res) => {
  const userId = 1;
  const result = await User.findOne({ _id: userId });

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

// ============================== Register

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  res
    .status(201)
    .json({ email: newUser.email, subscription: newUser.subscription });
};

// ============================== Login

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }

  const passwordCompare = bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }

  const { SECRET_KEY } = process.env;

  const payload = {
    id: user.id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  res.json({ token });
};

// ============================== Update status

const updateSubscription = async (req, res) => {
  const { contactId } = req.params;
  const result = await User.findByIdAndUpdate({ _id: contactId }, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

// ============================== Logout User

const logoutUser = async (req, res) => {
  const userId = 1;
  const result = await User.findOne({ _id: userId });

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

module.exports = {
  getCurrentUser: ctrlWrapper(getCurrentUser),
  registerUser: ctrlWrapper(registerUser),
  loginUser: ctrlWrapper(loginUser),
  logoutUser: ctrlWrapper(logoutUser),
  updateSubscription: ctrlWrapper(updateSubscription),
};
