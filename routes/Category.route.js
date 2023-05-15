const express = require("express");
const router = express.Router();
const Category = require("../controller/Category.controller");

router.get("/", Category.getAll);
router.get("/:name", Category.getOne);
router.get("/:name/:subcategory", Category.getProducts);
router.post("/", Category.addOne);
router.delete("/:id", Category.deleteOne);

module.exports = router;
