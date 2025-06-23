const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, "uploads/");
  },
});

const upload = multer({
  storage,
  limits: 5 * 1024 * 1024,
});

module.exports = upload;
