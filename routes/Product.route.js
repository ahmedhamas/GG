const express = require("express");
const router = express.Router();
const Product = require("../controller/Product.controller");

router.post("/", Product.addOne);
router.get("/:id", Product.getOne);
router.delete("/:id", Product.deleteOne);
router.post("/code", Product.getCode);

module.exports = router;
