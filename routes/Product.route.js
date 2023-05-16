const express = require("express");
const router = express.Router();
const Product = require("../controller/Product.controller");

router.post("/", Product.addOne);
router.get("/cart", Product.getCart);
router.post("/add_to_cart", Product.AddToCart);
router.get("/:id", Product.getOne);
router.delete("/:id", Product.deleteOne);
router.post("/code", Product.getCode);

module.exports = router;
