const express = require("express");
const router = express.Router();
const {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");
const validateToken = require("../middleware/validateTokenHandler");
const authenticateUser = require("../middleware/authHandler");

router.use(validateToken);
router.use(authenticateUser)
router.route("/").get(getBlogs).post(createBlog);
router.route("/:id").get(getBlog).put(updateBlog).delete(deleteBlog);

module.exports = router;
