const express = require("express");
const router = new express.Router();
const controller = require("../controllers/auth");
const auth = require("../middleware/auth");

router.post("/login", controller.login);

router.post("/logout", auth, controller.logout);

router.post("/logoutAll", auth, controller.logoutAll);

module.exports = router;
