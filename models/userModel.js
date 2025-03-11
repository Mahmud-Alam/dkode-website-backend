const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter your username!"],
    },
    fullname: {
      type: String,
      required: [true, "Please enter your full name!"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email address!"],
      unique: [true, "This email address is already taken!"],
      lowercase: true,
      match: [
        /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
        "Please enter a valid email address!",
      ],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minlength: 8,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
