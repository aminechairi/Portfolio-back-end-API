const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required."],
      trim: true,
      minlength: [3, "First name must be at least 3 characters."],
      maxlength: [16, "First name cannot exceed 16 characters."],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required."],
      trim: true,
      minlength: [3, "Last name must be at least 3 characters."],
      maxlength: [16, "Last name cannot exceed 16 characters."],
    },
    slug: {
      type: String,
      required: [true, "Slug is required."],
      trim: true,
    },
    subject: {
      type: String,
      required: [true, "Subject is required."],
      trim: true,
      minlength: [3, "Subject must be at least 3 characters."],
      maxlength: [48, "Subject cannot exceed 48 characters."],
    },
    about: {
      type: String,
      required: [true, "About is required."],
      trim: true,
      minlength: [128, "About must be at least 128 characters."],
      maxlength: [320, "About cannot exceed 320 characters."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address."],
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      minlength: [8, "Password must be at least 8 characters."],
      select: false,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required."],
      trim: true,
    },
    dateOfBirth: Date,
    address: {
      type: String,
      required: [true, "Address is required."],
      trim: true,
      minlength: [3, "Address must be at least 3 characters."],
      maxlength: [48, "Address cannot exceed 48 characters."],
    },
    zipCode: {
      type: Number,
      required: [true, "Zip code is required."],
      validate: {
        validator: Number.isInteger,
        message: "Zip code must be an integer."
      }
    },
    profileImage: {
      type: String,
      trim: true,
    },
    homeImage: {
      type: String,
      trim: true,
    },
    aboutImage: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);