const express = require(`express`);

const {
  createSocialMediaValidator,
  getSocialMediaByIDValidator,
  updateSocialMediaValidator,
  deleteSocialMediaValidator
} = require("../utils/validators/socialMediaValidator");

const {
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
    createSocialMediaValidator,
    createSocialMedia
  );

  router
  .route("/:id")
  .get(
    getSocialMediaByIDValidator,
    getSocialMediaByID
  ).put(
    updateSocialMediaValidator,
    updateSocialMedia
  ).delete(
    deleteSocialMediaValidator,
    deleteSocialMedia
  );

module.exports = router;