const express = require("express");
const router = express.Router();
const CategoryController = require("../controller/Category.controller");
const ProductController = require("../controller/Product.controller");
const UserController = require("../controller/User.controller");

router.get("/", CategoryController.getAll);
router.get("/:category", CategoryController.getOne);
router.get("/:category/:subcategory", CategoryController.getProducts);
router.get("/product/show/:id", ProductController.getOne);
router.get("/cart/show/items", ProductController.getCart);
router.get("/user/info/login", UserController.getLogin);
router.get("/user/info/register", UserController.getRegister);
router.get("/user/info/logout", UserController.Logout);
router.post("/login", UserController.Login);
router.post("/register", UserController.Register);

module.exports = router;
