const mongoose = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Schema = mongoose.Schema;
const Joi = require("joi");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// ========================== Mongoose schemas

const userSchema = new Schema(
  {
    password: {
      type: String,
      minLength: 6,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: [true, "Email is required"],
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const User = mongoose.model("user", userSchema);

// ========================== Joi schemas

const registerSchema = Joi.object({
  password: Joi.string()
    .min(6)
    .required()
    .messages({ "any.required": "Set password for user" }),
  email: Joi.string()
    .pattern(emailRegexp)
    .required()
    .messages({ "any.required": "Email is required" }),
  subscription: Joi.string().required(),
});

const loginSchema = Joi.object({
  password: Joi.string()
    .min(6)
    .required()
    .messages({ "any.required": "Set password for user" }),
  email: Joi.string()
    .pattern(emailRegexp)
    .required()
    .messages({ "any.required": "Email is required" }),
});

module.exports = { User, loginSchema, registerSchema };
