const express = require("express");
const { validateBody, aunthenticate } = require("../../middlewares");
const { loginSchema, registerSchema } = require("../../models/user");

const router = express.Router();

const ctrl = require("../../controllers/users");

router.post("/register", validateBody(registerSchema), ctrl.registerUser);

router.post("/login", validateBody(loginSchema), ctrl.loginUser);

router.get("/current", aunthenticate, ctrl.getCurrentUser);

router.post("/logout", aunthenticate, ctrl.logoutUser);

router.patch("/", aunthenticate, ctrl.updateSubscription);

module.exports = router;
