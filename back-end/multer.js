import multer from "multer";

// set Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const filename = file.originalname.split(".")[0];
    cb(null, filename + "-" + Date.now() + ".png");
  },
});

module.exports = multer({ storage: storage });
