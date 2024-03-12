const asyncHandler = require("express-async-handler");

const { createOne, getOne, deleteOne } = require("./handlersFactory");
const userModel = require("../models/userModel");
const ApiError = require("../utils/apiError");
const errorObject = require("../utils/errorObject");

// @desc Create new user
// @route POST /api/v1/user
// @access
exports.createUser = createOne(userModel);

// @desc Get user
// @route GET /api/v1/user
// @access
exports.getUser = asyncHandler(async (_, res) => {
  const user = await userModel.findOne();
  res.status(200).json({
    data: user || {},
  });
});

// @desc Get user by ID
// @route GET /api/v1/user/:id
// @access
exports.getUserByID = getOne(userModel, "user");

// @desc Update user by ID
// @route PUT /api/v1/user/:id
// @access
exports.updateUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

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
    { new: true }
  );

  if (!user) {
    const message = `No user for this ID ${id}.`;

    throw next(
      new ApiError(message, errorObject(id, message, "id", "params"), 404)
    );
  }

  res.status(200).json({
    date: user,
  });
});

// @desc Delete user by ID
// @route DELETE /api/v1/user/:id
// @access
exports.deleteUser = deleteOne(userModel, "user");
