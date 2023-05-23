const express = require("express");
const router = express.Router();
const CategoryController = require("../controller/Category.controller");
const ProductController = require("../controller/Product.controller");
const UserController = require("../controller/User.controller");
const OrderController = require("../controller/Order.controller");
const AdminController = require("../controller/Admin.controller");
const SubcategoryController = require("../controller/SubCategory.controller");
//? GET {
router.get("/", CategoryController.getAll);
router.get("/:category", CategoryController.getOne);
router.get("/:category/:subcategory", CategoryController.getProducts);
router.get("/product/show/:id", ProductController.getOne);
router.get("/cart/show/items", ProductController.getCart);
router.get("/user/info/login", UserController.getLogin);
router.get("/gomla/info/about", UserController.about);
router.get("/gomla/info/contact_us", UserController.contactus);
router.get("/user/info/register", UserController.getRegister);
router.get("/pay/info/cash_on_delivery", OrderController.getCash);
router.get("/pay/info/success", OrderController.getSuccess);
router.get("/user/info/admin/:admin", AdminController.getAdmin);
router.get("/user/info/o_h/:userId", OrderController.getOrderHistory);
router.get("/admin/panle/users/:admin", AdminController.getUser);
router.get("/admin/panle/products/:admin", AdminController.getProducut);
router.get("/admin/panle/categorys/:admin", AdminController.getCategory);
router.get("/admin/panle/subcategorys/:admin", AdminController.getSubCategory);
router.get("/admin/panle/orders/:admin", AdminController.getOrders);
router.get("/info/contact_us/success", UserController.contact_success);
//? }
//? POST {
router.get("/contact", UserController.contact);
router.post("/login", UserController.Login);
router.post("/register", UserController.Register);
router.post("/order", OrderController.addOne);
router.post("/search", ProductController.searchProduct);
router.post("/search/users", AdminController.searchUsers);
router.post("/search/product", AdminController.searchProduct);
router.post("/search/subcategory", ProductController.searchProduct);
router.post("/search/orders", AdminController.searchOrders);
router.post("/search/orders/city", OrderController.getCitysOrders);
router.post("/add/category", CategoryController.addOne);
router.post("/add/subcategory", SubcategoryController.addOne);
router.post("/contact", UserController.contact);
//? }
//? DELETE {
router.post("/delete/user", AdminController.deleteUser);
router.post("/delete/order", AdminController.deleteOrder);
router.post("/delete/category", AdminController.deleteCategory);
router.post("/delete/subcategory", AdminController.deleteSubcategory);
router.post("/delete/product", AdminController.deleteProduct);
//? }
//? EDIT {
router.post("/edit/user", UserController.editManger);
router.post("/edit/order/delivered", OrderController.editDelivered);
router.post("/edit/order/paid", OrderController.editPaid);
router.post("/edit/category", CategoryController.editCategory);
router.post("/edit/subcategory", SubcategoryController.editSubcategory);
//? }
module.exports = router;
