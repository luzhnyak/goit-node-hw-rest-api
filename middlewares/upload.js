const multer = require("multer");
const { HttpError } = require("../helpers");
const path = require("path");

const tenpDir = path.join(__dirname, "../", "tmp");

const multerConfig = multer.diskStorage({
  destination: tenpDir,
  filename: (reg, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,
  limits: { fileSize: 2000000 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes("image")) {
      cb(null, true);
      return;
    }
    cb(new Error("The file type is not supported", 401));
  },
});

module.exports = upload;
