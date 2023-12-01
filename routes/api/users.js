const express = require("express");
const { validateBody, aunthenticate, upload } = require("../../middlewares");
const { userJoiSchema, userSubscriptionSchema } = require("../../models/user");

const router = express.Router();

const ctrl = require("../../controllers/users");

router.post("/register", validateBody(userJoiSchema), ctrl.registerUser);

router.post("/login", validateBody(userJoiSchema), ctrl.loginUser);

router.get("/current", aunthenticate, ctrl.getCurrentUser);

router.post("/logout", aunthenticate, ctrl.logoutUser);

router.patch(
  "/",
  aunthenticate,
  validateBody(userSubscriptionSchema),
  ctrl.updateSubscription
);

router.patch(
  "/avatars",
  aunthenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
