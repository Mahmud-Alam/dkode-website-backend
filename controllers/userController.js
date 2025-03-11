// @desc Register a user
// @route POST /api/users/register
// @access public
const registerUser = async (req, res) => {
  try {
    console.log("User Registration");
    res.status(200).json({ message: `User registration info: ${req.body.name}` });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc Login user
// @route POST /api/users/login
// @access public
const loginUser = async (req, res) => {
  try {
    console.log("User Registration");
    res.status(200).json({ message: `User login info: ${req.body.name}` });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc Current user info
// @route GET /api/users/current
// @access private
const userProfile = async (req, res) => {
  try {
    console.log("User profile");
    res.status(200).json({ message: `User profile info: ${req.body.name}` });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { registerUser, loginUser, userProfile };
