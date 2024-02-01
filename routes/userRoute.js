const express = require(`express`);

const {
  createUserValidator,
  deleteUserValidator,
  createUserValidatorMiddleware,
  updateUserValidator
} = require(".././utils/validators/userValidator");

const {
  createUser,
  getUser,
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
  .put(
    updateUserValidator,
    updateUser
  ).delete(
    deleteUserValidator,
    deleteUser
  );

module.exports = router;