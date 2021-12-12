const express = require("express");
const router = new express.Router();
const controller = require("../controllers/user");
const auth = require("../middleware/auth");

// router.get("", auth, controller.getAll);

router.get("/me", auth, controller.getMe);

// router.get("/:id", auth, controller.getById);

router.post("", controller.create);

router.patch("/me", auth, controller.update);

router.delete("/me", auth, controller.delete);

module.exports = router;
