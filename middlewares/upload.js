const multer = require("multer");
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
});

module.exports = upload;
