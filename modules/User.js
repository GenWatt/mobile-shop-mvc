const mongoose = require("mongoose");
const { isEmail } = require("validator");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const userSchema = new Schema({
  login: {
    type: String,
    minlength: [3, "Login should have at least 3 characters"],
    unique: true,
    trim: true,
    required: [true, "Please enter login"],
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: [true, "Please enter e-mail"],
    validate: [isEmail, "E-mail is invalid"],
  },
  password: {
    type: String,
    minlength: [6, "Password should have at least 6 characters"],
    required: [true, "Please enter Password"],
  },
  admin: { type: Boolean, required: true },
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
