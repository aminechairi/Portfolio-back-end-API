const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

const socialMediaModel = require("../../models/socialMediaModel");

exports.createSocialMediaValidator = [
  check("name")
    .notEmpty()
    .withMessage("Social media name is required.")
    .isString()
    .withMessage("Social media name must be of type string.")
    .trim()
    .isLength({ max: 12 })
    .withMessage("Social media name cannot exceed 12 characters.")
    .custom(async (val) => {
      const data = await socialMediaModel.findOne({
        name: val,
      });
      if (data) {
        throw new Error('This name already used.');
      };
    }),

  check('url')
    .notEmpty()
    .withMessage("URL is required.")
    .isURL()
    .withMessage('Invalid URL format.')
    .custom(async (val) => {
      const data = await socialMediaModel.findOne({
        url: val,
      });
      if (data) {
        throw new Error('This URL already used.');
      };
    }),

  validatorMiddleware,
];

exports.getSocialMediaByIDValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid social media ID format."),

  validatorMiddleware,
];

exports.updateSocialMediaValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid social media ID format."),

  check("name")
    .optional()
    .isString()
    .withMessage("Social media name must be of type string.")
    .trim()
    .isLength({ max: 12 })
    .withMessage("Social media name cannot exceed 12 characters.")
    .custom(async (val) => {
      const data = await socialMediaModel.findOne({
        name: val,
      });
      if (data) {
        throw new Error('This name already used.');
      };
    }),

  check('url')
    .optional()
    .isURL()
    .withMessage('Invalid URL format.')
    .custom(async (val) => {
      const data = await socialMediaModel.findOne({
        url: val,
      });
      if (data) {
        throw new Error('This URL already used.');
      };
    }),

  validatorMiddleware,
];

exports.deleteSocialMediaValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid social media ID format."),

  validatorMiddleware,
];