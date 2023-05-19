const express = require("express");
const router = express.Router();
const CategoryController = require("../controller/Category.controller");
const ProductController = require("../controller/Product.controller");
const UserController = require("../controller/User.controller");
const OrderController = require("../controller/Order.controller");

//? GET {
router.get("/", CategoryController.getAll);
router.get("/:category", CategoryController.getOne);
router.get("/:category/:subcategory", CategoryController.getProducts);
router.get("/product/show/:id", ProductController.getOne);
router.get("/cart/show/items", ProductController.getCart);
router.get("/user/info/login", UserController.getLogin);
router.get("/user/info/register", UserController.getRegister);
router.get("/pay/info/cash_on_delivery", OrderController.getCash);
router.get("/pay/info/success", OrderController.getSuccess);
router.get("/user/info/o_h", OrderController.getOrderHistory);
//? }
//? POST {
router.post("/login", UserController.Login);
router.post("/register", UserController.Register);
router.post("/order", OrderController.addOne);
router.post("/orderItem", OrderController.addItems);
//? }
module.exports = router;
