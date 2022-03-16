const express = require("express");
const router = express.Router();
const multer = require("multer");

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

// Model
const controller = require("../Controller/lost_items_controller");

router.get("/", controller.getLostItems);

router.get("/:userId", controller.getLostItemFındById);

router.post("/", upload.single("imageUrl"), controller.addLostItem);

router.delete("/delete/:lost_item_id", controller.deleteLostItemsById);

module.exports = router;
