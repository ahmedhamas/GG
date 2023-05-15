const express = require("express");
const router = express.Router();
const Category = require("../controller/Category.controller");

router.get("/", Category.getAll);
//router.get("/:name", Category.getOne);
//router.post("/", Category.addOne);
//router.delete("/:name", Category.deleteOne);

module.exports = router;
