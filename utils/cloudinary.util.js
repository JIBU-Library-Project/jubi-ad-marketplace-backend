const cloudinary = require("../config/cloudinary.config");
const uploadFile = (filePath) => {
  const response = cloudinary.uploader.upload(filePath, {
    resource_type: "auto",
  });

  return response;
};

module.exports = uploadFile;
