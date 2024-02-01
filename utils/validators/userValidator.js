const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

const userModel = require("../../models/userModel");
const ApiError = require("../../utils/apiError");
const errorObject = require('../errorObject');

exports.createUserValidatorMiddleware = asyncHandler(async (req, res, next) => {
  const user = await userModel.findOne();

  if (user) {
    const message = `You cannot create more then one user.`;

    throw next(
      new ApiError(message, errorObject(
        undefined,
        message,
        undefined,
        undefined
      ), 404)
    );
  };

  next();
});

exports.createUserValidator = [
  check("firstName")
    .notEmpty()
    .withMessage("First name is required.")
    .isString()
    .withMessage("First name must be of type string.")
    .trim()
    .isLength({ min: 3 })
    .withMessage("First name must be at least 3 characters.")
    .isLength({ max: 16 })
    .withMessage("First name cannot exceed 16 characters."),

  check("lastName")
    .notEmpty()
    .withMessage("Last name is required.")
    .isString()
    .withMessage("Last name must be of type string.")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Last name must be at least 3 characters.")
    .isLength({ max: 16 })
    .withMessage("Last name cannot exceed 16 characters.")
    .custom(async (_, { req }) => {
      // Add slug property in req.bosy
      const firstName = req.body.firstName;
      const lastName = req.body.lastName;

      const slug = slugify(`${firstName} ${lastName}`, { lower: true });
      req.body.slug = slug;

      return true;
    }),

  check("subject")
    .notEmpty()
    .withMessage("Subject is required.")
    .isString()
    .withMessage("Subject must be of type string.")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Subject must be at least 3 characters.")
    .isLength({ max: 48 })
    .withMessage("Subject cannot exceed 48 characters."),

  check("about")
    .notEmpty()
    .withMessage("About is required.")
    .isString()
    .withMessage("About must be of type string.")
    .trim()
    .isLength({ min: 128 })
    .withMessage("About must be at least 128 characters.")
    .isLength({ max: 320 })
    .withMessage("About cannot exceed 320 characters."),

  check("email")
    .notEmpty()
    .withMessage("Enail is required.")
    .isEmail()
    .withMessage("Please provide a valid email address.")
    .trim()
    .custom(async (value) => {
      // Check email is already in use
      const user = await userModel.findOne({
        email: value,
      });

      if (user) {
        throw new Error("Email address is already in use.");
      }
      return true;
    }),

  check("password")
    .notEmpty()
    .withMessage("Password is required.")
    .isString()
    .withMessage("Password must be of type string.")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters."),

  check("phone")
    .notEmpty()
    .withMessage("Phone number is required.")
    .isString()
    .withMessage("Phone number must be of type string.")
    .isMobilePhone()
    .withMessage("Please provide a valid phone number."),

  check("dateOfBirth")
    .optional()
    .isString()
    .withMessage("Date of birth must be of type string.")
    .custom((value) => {
      const regex = /^\d{2}-\d{2}-\d{4}$/;
      if (!regex.test(value)) {
        throw new Error("Invalid date format. Please use mm-dd-yyyy.");
      }
      return true;
    }),

  check("address")
    .notEmpty()
    .withMessage("Address is required.")
    .isString()
    .withMessage("Address must be of type string.")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Address must be at least 3 characters.")
    .isLength({ max: 48 })
    .withMessage("Address cannot exceed 48 characters."),

  check("zipCode")
    .notEmpty()
    .withMessage("Zip code is required.")
    .isPostalCode("any")
    .withMessage("Please provide a valid zip code."),

  validatorMiddleware,
];




exports.updateUserValidator = [

  check("id")
    .isMongoId()
    .withMessage("Invalid user ID format."),

  check("firstName")
    .optional()
    .isString()
    .withMessage("First name must be of type string.")
    .trim()
    .isLength({ min: 3 })
    .withMessage("First name must be at least 3 characters.")
    .isLength({ max: 16 })
    .withMessage("First name cannot exceed 16 characters.")
    .custom((_, { req }) => {
      const lastName = req.body.lastName;
      if (!lastName) {
        throw new Error("Please write last name.");
      }
      return true;
    }),

  check("lastName")
    .optional()
    .isString()
    .withMessage("Last name must be of type string.")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Last name must be at least 3 characters.")
    .isLength({ max: 16 })
    .withMessage("Last name cannot exceed 16 characters.")
    .custom((_, { req }) => {
      const frisrName = req.body.firstName;
      if (!frisrName) {
        throw new Error("Please write first name.");
      }
      return true;
    })
    .custom(async (_, { req }) => {
      // Add slug property in req.bosy
      const firstName = req.body.firstName;
      const lastName = req.body.lastName;

      const slug = slugify(`${firstName} ${lastName}`, { lower: true });
      req.body.slug = slug;

      return true;
    }),

  check("subject")
    .optional()
    .isString()
    .withMessage("Subject must be of type string.")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Subject must be at least 3 characters.")
    .isLength({ max: 48 })
    .withMessage("Subject cannot exceed 48 characters."),

  check("about")
    .optional()
    .isString()
    .withMessage("About must be of type string.")
    .trim()
    .isLength({ min: 128 })
    .withMessage("About must be at least 128 characters.")
    .isLength({ max: 320 })
    .withMessage("About cannot exceed 320 characters."),

  // check("email")
  //   .optional()
  //   .isEmail()
  //   .withMessage("Please provide a valid email address.")
  //   .trim()
  //   .custom(async (value) => {
  //     // Check email is already in use
  //     const user = await userModel.findOne({
  //       email: value,
  //     });

  //     if (user) {
  //       throw new Error("Email address is already in use.");
  //     }
  //     return true;
  //   }),

    // check("password")
    //   .notEmpty()
    //   .withMessage("Password is required.")
    //   .isString()
    //   .withMessage("Password must be of type string.")
    //   .trim()
    //   .isLength({ min: 8 })
    //   .withMessage("Password must be at least 8 characters."),

  check("phone")
    .optional()
    .isString()
    .withMessage("Phone number must be of type string.")
    .isMobilePhone()
    .withMessage("Please provide a valid phone number."),

  check("dateOfBirth")
    .optional()
    .isString()
    .withMessage("Date of birth must be of type string.")
    .custom((value) => {
      const regex = /^\d{2}-\d{2}-\d{4}$/;
      if (!regex.test(value)) {
        throw new Error("Invalid date format. Please use mm-dd-yyyy.");
      }
      return true;
    }),

  check("address")
    .optional()
    .isString()
    .withMessage("Address must be of type string.")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Address must be at least 3 characters.")
    .isLength({ max: 48 })
    .withMessage("Address cannot exceed 48 characters."),

  check("zipCode")
    .optional()
    .isPostalCode("any")
    .withMessage("Please provide a valid zip code."),

  validatorMiddleware,
];




exports.deleteUserValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid user ID format."),

  validatorMiddleware,
];
