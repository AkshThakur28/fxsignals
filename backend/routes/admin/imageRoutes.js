const express = require("express");
const router = express.Router();
const multer = require("multer");
const imageController = require("../../controllers/admin/imageController");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/upload-image");
  },
  filename: (req, file, cb) => {const express = require("express");
const router = express.Router();
const multer = require("multer");
const imageController = require("../../controllers/admin/imageController");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../../uploads/upload-image');
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
  },
});

const upload = multer({ storage: storage, limits: { fileSize: 1024 * 1024 * 5 } });

router.post("/add_upload_image", upload.single("image"), imageController.addImage);

router.get("/upload_image_view", imageController.upload_image_view);

router.delete("/upload_image_delete/:id", imageController.deleteImage);

router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    res.status(400).send({ message: 'File upload failed.' });
  } else {
    res.status(500).send({ message: 'Internal server error.' });
  }
});

module.exports = router;
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/add_upload_image", upload.single("image"), imageController.addImage);

router.get("/upload_image_view", imageController.upload_image_view);

router.delete("/upload_image_delete/:id", imageController.deleteImage);

module.exports = router;
