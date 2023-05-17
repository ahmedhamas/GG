const express = require("express");
const router = express.Router();
const User = require("../controller/User.controller");

router.get("/", User.getLogin);
router.post("/login", User.Login);
router.get("/register", User.getRegister);
router.post("/register", User.Register);
router.delete("/:id", User.deleteOne);

module.exports = router;
