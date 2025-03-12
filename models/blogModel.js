const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: [String], required: true },
    images: { type: [String] },
    slug: { type: String, required: true, unique: true },
    introduction: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: [
        "itsm",
        "itom",
        "workflow",
        "cmdb",
        "grc",
        "ppm",
        "security",
        "itam",
      ],
    },
    keyFeatures: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],
    advantages: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],
    conclusion: { type: [String], required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Blog", blogSchema);
