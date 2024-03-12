const asyncHandler = require("express-async-handler");

const ApiError = require("../utils/apiError");
const errorObject = require("../utils/errorObject");

exports.createOne = (model) =>
  asyncHandler(async (req, res) => {
    const document = await model.create(req.body);

    res.status(201).json({
      data: document,
    });
  });

exports.getAll = (model) =>
  asyncHandler(async (_, res) => {
    const document = await model.find();

    res.status(200).json({
      data: document,
    });
  });

exports.getOne = (model, name) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const document = await model.findById(id);

    if (!document) {
      const message = `No ${name} for this ID ${id}.`;
      throw next(
        new ApiError(message, errorObject(id, message, "id", "params"), 404)
      );
    }

    res.status(200).json({
      data: document,
    });
  });

exports.updateOne = (model, name) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const document = await model.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    if (!document) {
      const message = `No ${name} for this ID ${id}.`;

      throw next(
        new ApiError(message, errorObject(id, message, "id", "params"), 404)
      );
    }

    res.status(200).json({
      data: document,
    });
  });

exports.deleteOne = (model, name) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const document = await model.findByIdAndDelete(id);

    if (!document) {
      const message = `No ${name} for this ID ${id}.`;
      throw next(
        new ApiError(message, errorObject(id, message, "id", "params"), 404)
      );
    }

    res.status(200).json({
      data: document,
    });
  });