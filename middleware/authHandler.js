const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// Middleware to authenticate and authorize users
const authenticateUser = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    res.status(403);
    throw new Error("User not authenticated, access denied!");
  }

  const reqUser = await User.findById(req.user.id);
  if (!reqUser) {
    res.status(403);
    throw new Error("User doesn't have permission to access this resource!");
  }

  next(); // Proceed to the next middleware or route handler
});

module.exports = authenticateUser;