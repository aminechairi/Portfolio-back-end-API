const { check } = require("express-validator");
const asyncHandler = require("express-async-handler");
const sharp = require("sharp");

const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const socialMediaModel = require("../../models/socialMediaModel");
const ApiError = require("../apiError");
const errorObject = require("../errorObject");

exports.createSocialMediaValidatorMiddleware = asyncHandler(
  async (_, __, next) => {

    const length = await socialMediaModel.countDocuments();
    const max = 6;

    if (length >= max) {
      const message = `You cannot create more then ${max} social media.`;
      throw next(
        new ApiError(
          message,
          errorObject(undefined, message, undefined, undefined),
          404
        )
      );
    };

    next();
  }
);

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
        throw new Error("This name already used.");
      }
    }),

  check("url")
    .notEmpty()
    .withMessage("URL is required.")
    .isURL()
    .withMessage("Invalid URL format.")
    .custom(async (val) => {
      const data = await socialMediaModel.findOne({
        url: val,
      });
      if (data) {
        throw new Error("This URL already used.");
      }
    }),

  check("image")
    .custom((_, { req }) => {
      if (!(req.body.image === undefined)) {
        throw new Error("The field you entered for Image is not an Image type.");
      }
      return true;
    }),

  validatorMiddleware,
];

exports.createSocialMediaImageValidator = asyncHandler(
  async (req, _, next) => {

    // Validate the image is upload.
    if (!req.file) {
      const message = `Social media image is required.`;
      throw next(
        new ApiError(
          message,
          errorObject(undefined, message, "image", "body"),
          400
        )
      );
    };

    // Validate width and height of the image.
    // Use sharp to get image metadata
    const metadata = await sharp(req.file.buffer).metadata();
    const width = 4096; // width allowed
    const height = 4096; // height allowed

    if (metadata.width !== width || metadata.height !== height) {
      const message = `The image size should be ${width} pixels wide and ${height} pixels tall.`;
      throw next(
        new ApiError(
          message,
          errorObject(req.file.originalname, message, "image", "body"),
          400
        )
      );
    };

    next();
  }
);

exports.getSocialMediaByIDValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid social media ID format."),

  validatorMiddleware,
];

exports.updateSocialMediaValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid social media ID format.")
    .custom(async (id) => {
      const data = await socialMediaModel.findById(id);
      if (!data) {
        throw new Error(`No social media for this ID ${id}.`);
      };
    }),

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
        throw new Error("This name already used.");
      }
    }),

  check("url")
    .optional()
    .isURL()
    .withMessage("Invalid URL format.")
    .custom(async (val) => {
      const data = await socialMediaModel.findOne({
        url: val,
      });
      if (data) {
        throw new Error("This URL already used.");
      }
    }),

  check("image")
    .custom((_, { req }) => {
      if (!(req.body.image === undefined)) {
        throw new Error("The field you entered for Image is not an Image type.");
      }
      return true;
    }),

  validatorMiddleware,
];

exports.updateSocialMediaImageValidator = asyncHandler(
  async (req, _, next) => {
    if (req.file) {
      // Validate width and height of the image.
      // Use sharp to get image metadata
      const metadata = await sharp(req.file.buffer).metadata();
      const width = 4096; // width allowed
      const height = 4096; // height allowed

      if (metadata.width !== width || metadata.height !== height) {
        const message = `The image size should be ${width} pixels wide and ${height} pixels tall.`;
        throw next(
          new ApiError(
            message,
            errorObject(req.file.originalname, message, "image", "body"),
            400
          )
        );
      }
    };
    next();
  }
);

exports.deleteSocialMediaValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid social media ID format."),

  validatorMiddleware,
];
