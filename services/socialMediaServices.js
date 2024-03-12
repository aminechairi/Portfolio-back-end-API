const {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} = require("./handlersFactory");

const socialMediaModel = require("../models/socialMediaModel");

// @desc Create a new social media
// @route POST /api/v1/social-media
// @access
exports.createSocialMedia = createOne(socialMediaModel);

// @desc Get social medias
// @route GET /api/v1/social-media
// @access
exports.getSocialMedias = getAll(socialMediaModel);

// @desc Get social media by ID
// @route GET /api/v1/social-media/:id
// @access
exports.getSocialMediaByID = getOne(socialMediaModel, "social media");

// @desc Update social media by ID
// @route PUT /api/v1/social-media/:id
// @access
exports.updateSocialMedia = updateOne(socialMediaModel, "social media");

// @desc Delete social media by ID
// @route DELETE /api/v1/social-media/:id
// @access
exports.deleteSocialMedia = deleteOne(socialMediaModel, "social media");