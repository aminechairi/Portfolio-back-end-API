const express = require(`express`);

const {
  createUserValidatorMiddleware,
  createUserValidator,
  getUserByIDValidator,
  updateUserValidator,
  deleteUserValidator
} = require("../utils/validators/userValidator");

const {
  createUser,
  getUser,
  getUserByID,
  updateUser,
  deleteUser
} = require("../services/userServices");

const router = express.Router();

router
  .route("/")
  .get(
    getUser
  )
  .post(
    createUserValidatorMiddleware,
    createUserValidator,
    createUser
  );

  router
  .route("/:id")
  .get(
    getUserByIDValidator,
    getUserByID
  ).put(
    updateUserValidator,
    updateUser
  ).delete(
    deleteUserValidator,
    deleteUser
  );

module.exports = router;