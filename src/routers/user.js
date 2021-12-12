const express = require("express");
const multer = require("multer");
const router = new express.Router();
const controller = require("../controllers/user");
const auth = require("../middleware/auth");
const error = require("../middleware/error");

// router.get("", auth, controller.getAll);

router.get("/me", auth, controller.getMe);

router.get("/:id/avatar", controller.getAvatar);

// router.get("/:id", auth, controller.getById);

router.post("", controller.create);

const upload = multer({
  //   dest: "avatars",
  limits: {
    fileSize: 1000000,
  },
  fileFilter(_req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      return cb(new Error("Please upload an image"));
    }

    cb(undefined, true);
  },
});

router.post(
  "/me/avatar",
  auth,
  upload.single("avatar"),
  controller.uploadAvatar,
  error
);

router.patch("/me", auth, controller.update);

router.delete("/me", auth, controller.delete);

router.delete("/me/avatar", auth, controller.deleteAvatar);

module.exports = router;
