const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();

app.set("view engine", "ejs");

const corsOptions = {
  origin: "*",
};
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors(corsOptions));

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
