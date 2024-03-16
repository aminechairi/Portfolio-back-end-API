const mongoose = require("mongoose");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { GetObjectCommand } = require("@aws-sdk/client-s3");
const s3Client = require('../config/s3Client');

const socialMediaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Social media name is required."],
      trim: true,
      unique: true,
      lowercase: true,
      maxlength: [12, "Social media name cannot exceed 12 characters."],
    },
    url: {
      type: String,
      required: [true, "URL is required."],
      trim: true,
      unique: true,
    },
    image: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const setImageUrl = async (doc) => {

  if (doc.image) {

    const awsBuckName = process.env.AWS_BUCKET_NAME;
    const expiresIn = process.env.EXPIRE_IN;
  
    const getObjectParams = {
      Bucket: awsBuckName,
      Key: `social-media/${doc.image}`,
    };
  
    const command = new GetObjectCommand(getObjectParams);
    const imageUrl = await getSignedUrl(s3Client, command, { expiresIn });
  
    doc.image = imageUrl;

  };

};

// findOne, findAll, update, delete
socialMediaSchema.post("init", async (doc) => {
  await setImageUrl(doc);
});

// create
socialMediaSchema.post("save", async (doc) => {
  await setImageUrl(doc);
});

module.exports = mongoose.model("SocialMedia", socialMediaSchema);