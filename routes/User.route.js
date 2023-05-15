const express = require("express");
const router = express.Router();
const User = require("../controller/User.controller");

router.get("/", User.getLogin);
router.get("/:token", User.getOne);
router.post("/login", User.Login);
router.post("/", User.Register);
router.delete("/:id", User.deleteOne);

module.exports = router;
