const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// @desc Register a user
// @route POST /api/users/register
// @access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, fullname, email, password, isActive } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Username, Email and Password are mandatory!");
  }
  
  const usernameAvailable = await User.findOne({ username });
  const emailAvailable = await User.findOne({ email });
  if (usernameAvailable) {
    res.status(400);
    throw new Error("Username is already Exist!");
  }else if (emailAvailable) {
    res.status(400);
    throw new Error("Email is already Exist!");
  }

  // Hash Password
  const hashedPassword = await bcrypt.hash(password, 10);
  // console.log("Hashed Password: ",hashedPassword);

  // Create User
  const user = await User.create({
    username,
    fullname,
    email,
    password: hashedPassword,
    isActive,
  });

  if (user) {
    res
      .status(201)
      .json({ _id: user.id, username: user.username, fullname:user.fullname, email: user.email, isActive: user.isActive });
  } else {
    res.status(400);
    throw new Error("User data is not valid!");
  }
});

// @desc Login user
// @route POST /api/users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400);
    throw new Error("Username and Password are mandatory!");
  }

  const user = await User.findOne({ username });

  //compare password with hased password
  const comparePassword = await bcrypt.compare(password, user.password);
  if (user && comparePassword) {
    const accessToken = jwt.sign(
      {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Email or Password is Incorrect!");
  }
});

// @desc Current user info
// @route GET /api/users/current
// @access private
const userProfile = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registerUser, loginUser, userProfile };
