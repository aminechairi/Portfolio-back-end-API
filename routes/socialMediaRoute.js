const express = require(`express`);

const {
  createSocialMediaValidatorMiddleware,
  createSocialMediaValidator,
  createSocialMediaImageValidator,
  getSocialMediaByIDValidator,
  updateSocialMediaValidator,
  updateSocialMediaImageValidator,
  deleteSocialMediaValidator
} = require("../utils/validators/socialMediaValidator");

const {
  uploadImage,
  imageProcessing,
  createSocialMedia,
  getSocialMedias,
  getSocialMediaByID,
  updateSocialMedia,
  deleteSocialMedia
} = require("../services/socialMediaServices");

const router = express.Router();

router
  .route("/")
  .get(
    getSocialMedias,
  )
  .post(
    uploadImage,
    createSocialMediaValidatorMiddleware,
    createSocialMediaValidator,
    createSocialMediaImageValidator,
    imageProcessing,
    createSocialMedia
  );

  router
  .route("/:id")
  .get(
    getSocialMediaByIDValidator,
    getSocialMediaByID
  ).put(
    uploadImage,
    updateSocialMediaValidator,
    updateSocialMediaImageValidator,
    imageProcessing,
    updateSocialMedia
  ).delete(
    deleteSocialMediaValidator,
    deleteSocialMedia
  );

module.exports = router;