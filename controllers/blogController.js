const asyncHandler = require("express-async-handler");
const Blog = require("../models/blogModel");

// @desc Get all blogs
// @route GET /api/blogs
// @access private (Authenticated users only)
const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find();
  res.status(200).json(blogs);
});

// @desc Get a blog
// @route GET /api/blogs/:id
// @access private (Authenticated users only)
const getBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    res.status(404);
    throw new Error("No blog is found with this ID!");
  }
  res.status(200).json(blog);
});

// @desc Create a new blog
// @route POST /api/blogs
// @access private (Authenticated users only)
const createBlog = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    images,
    slug,
    introduction,
    category,
    keyFeatures,
    advantages,
    conclusion,
  } = req.body;

  if (!title || !slug || !category) {
    res.status(400);
    throw new Error("Blog title, slug and category are required!");
  }

  const blog = await Blog.create({
    title,
    description,
    images,
    slug,
    introduction,
    category,
    keyFeatures,
    advantages,
    conclusion,
  });

  res.status(201).json(blog);
});

// @desc Update a blog
// @route PUT /api/blogs/:id
// @access private (Authenticated users only)
const updateBlog = asyncHandler(async (req, res) => {
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!updatedBlog) {
    res.status(404);
    throw new Error("No blog is found with this ID!");
  }
  res.status(200).json(updatedBlog);
});

// @desc Delete a blog
// @route DELETE /api/blogs/:id
// @access private (Authenticated users only)
const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    res.status(404);
    throw new Error("No blog is found with this ID!");
  }

  await Blog.deleteOne({ _id: req.params.id });
  res.status(200).json(blog);
});

module.exports = {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
};
