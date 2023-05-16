const express = require("express");
const router = express.Router();
const Category = require("../controller/Category.controller");

router.get("/", Category.getAll);
router.get("/:name", Category.getOne);
router.get("/:name/:subcategory", Category.getProducts);
router.post("/", Category.addOne);
router.get("/cart", Category.getCart);
router.post("/add_to_cart", Category.AddToCart);
router.delete("/:id", Category.deleteOne);

module.exports = router;
