const mongoose = require("mongoose");

const socialMediaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Social media name is required."],
      trim: true,
      unique: true,
      lowercase: true,
      maxlength: [12, "Social media name cannot exceed 12 characters."],
    },
    url: {
      type: String,
      required: [true, "URL is required."],
      trim: true,
      unique: true,
    },
    image: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SocialMedia", socialMediaSchema);