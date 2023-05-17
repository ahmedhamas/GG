const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
require("dotenv").config();

//* express use {

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use("/favicon.ico", express.static("public/img/favicon.ico"));
app.use(
  session({
    secret: "1234567890abcdefghijklmnopqrstuvwxyz",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

//* }

//? headers {

const corsOptions = {
  origin: "*",
};
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors(corsOptions));
//? }
//!const routes {
const ProductRoute = require("./routes/Product.route");
const CategoryRoute = require("./routes/Category.route");
const SubCategoryRoute = require("./routes/SubCategory.route");
const OrderRoute = require("./routes/Order.route");
const UserRoute = require("./routes/User.route");
//! }

//? use route {
app.use("/product", ProductRoute);
app.use("/", CategoryRoute);
app.use("/subcategory", SubCategoryRoute);
app.use("/order", OrderRoute);
app.use("/user", UserRoute);
//? }

app.listen(process.env.PORT || 3000);
