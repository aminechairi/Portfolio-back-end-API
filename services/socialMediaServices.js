const asyncHandler = require("express-async-handler");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const s3Client = require("../config/s3Client");

const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");

const {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} = require("./handlersFactory");

const socialMediaModel = require("../models/socialMediaModel");

const awsBuckName = process.env.AWS_BUCKET_NAME;

// Upload single image
exports.uploadImage = uploadSingleImage("image");

exports.imageProcessing = asyncHandler(async (req, _, next) => {
  if (req.file) {
    const imageFormat = "png";

    const buffer = await sharp(req.file.buffer)
      .toFormat(imageFormat)
      .jpeg({ quality: 100 })
      .toBuffer();

    const imageName = `${"social-media"}-${uuidv4()}-${Date.now()}.${imageFormat}`;

    const params = {
      Bucket: awsBuckName,
      Key: `${"social-media"}/${imageName}`,
      Body: buffer,
      ContentType: `image/${imageFormat}`,
    };

    const command = new PutObjectCommand(params);
    await s3Client.send(command);

    // Save image name to Into Your db
    req.body.image = imageName;
  };
  next();
});

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
exports.deleteSocialMedia = deleteOne(socialMediaModel, "social media", true);
