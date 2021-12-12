const express = require("express");
const router = new express.Router();
const controller = require("../controllers/task");
const auth = require("../middleware/auth");

// GET /tasks?limit=10&page=1&sortBy=createdAt_desc&completed=true
router.get("", auth, controller.getAll);

router.get("/:id", auth, controller.getById);

router.post("", auth, controller.create);

router.patch("/:id", auth, controller.update);

router.delete("/:id", auth, controller.delete);

module.exports = router;
