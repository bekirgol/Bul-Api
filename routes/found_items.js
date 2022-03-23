const express = require("express");
const router = express.Router();
const multer = require("multer");
const authendicate = require("../Middleware/authendicate");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./upload");
  },

  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  }
  cb(null, false);
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

//Model
const controller = require("../Controller/found_items_controller");

router.route("/").get(authendicate, controller.getFountItems);

router
  .route("/")
  .post(authendicate, upload.single("imageUrl"), controller.addFoundItems);

router.route("/:userId").get(authendicate, controller.getFoundItemsFindById);

router
  .route("/delete/:found_item_id")
  .delete(authendicate, controller.deleteFoundItemsFindById);

module.exports = router;
