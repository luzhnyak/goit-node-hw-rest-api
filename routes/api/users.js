const express = require("express");
const { validateBody } = require("../../middlewares");
const { loginSchema, registerSchema } = require("../../models/user");

const router = express.Router();

const ctrl = require("../../controllers/users");

router.post("/register", validateBody(registerSchema), ctrl.registerUser);

router.post("/login", validateBody(loginSchema), ctrl.loginUser);

router.get("/current", ctrl.getCurrentUser);

router.get("/lodout", ctrl.logoutUser);

router.patch("/:subscription", ctrl.updateSubscription);

module.exports = router;
