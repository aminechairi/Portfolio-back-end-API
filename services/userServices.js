const asyncHandler = require("express-async-handler");

const userModel = require("../models/userModel");
const ApiError = require("../utils/apiError");
const errorObject = require('../utils/errorObject');

// @desc Create new user
// @route POST /api/v1/user
// @access
exports.createUser = asyncHandler(async (req, res) => {
  // Create user
  const user = await userModel.create(req.body);

  res.status(200).json({
    user,
  });
});

// @desc Get user
// @route GET /api/v1/user
// @access
exports.getUser = asyncHandler(async (_, res) => {
  // Get user
  const user = await userModel.findOne();

  res.status(200).json({
    data: user || {},
  });
});

// @desc Update user
// @route PUT /api/v1/user
// @access
exports.updateUser = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  // Update user
  const user = await userModel.findByIdAndUpdate(
    { _id: id },
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      subject: req.body.subject,
      about: req.body.about,
      phone: req.body.phone,
      dateOfBirth: req.body.dateOfBirth,
      address: req.body.address,
      zipCode: req.body.zipCode,
    },
    { new: true, }
  );

  if (!user) {

    const message = `No user for this ID ${id}.`;

    throw next(
      new ApiError(
        message,
        errorObject(id, message, 'id', 'params'),
        404
      )
    );

  };

  res.status(200).json({
    user,
  });
});

// @desc Delete user
// @route PUT /api/v1/user
// @access
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  // Delete user
  const user = await userModel.findByIdAndDelete(id);

  if (!user) {

    const message = `No user for this ID ${id}.`;

    throw next(
      new ApiError(
        message,
        errorObject(id, message, 'id', 'params'),
        404
      )
    );

  };

  res.status(200).json({
    user,
  });
});