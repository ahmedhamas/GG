const db = require("../db/index");

const controller = {
  addOne: (req, res) => {
    const { name, image, name_ar } = req.body;
    db.query(
      "SELECT * FROM `category` WHERE `name` = ?",
      [name],
      (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
          res.json({ message: "sorry this name is already made" });
        } else {
          db.query(
            "INSERT INTO `category` (`name`, `image`, `name_ar`) VALUES (?, ?, ?)",
            [name, image, name_ar],
            (err, result) => {
              if (err) throw err;
              res.json({
                data: result,
                message: name + " has been made successfully",
              });
            }
          );
        }
      }
    );
  },
  getOne: (req, res) => {
    const { name } = req.params;
    if (!req.session.cart) {
      req.session.cart = [];
    }
    db.query(
      "SELECT * FROM `subcategory` WHERE `category` = ?",
      [name],
      (err, result) => {
        if (err) throw err;
        const CartLength = req.session.cart.length;
        res.render("Category", {
          subcategory: result,
          name: name,
          cartL: CartLength,
        });
      }
    );
  },
  getProducts: (req, res) => {
    const subcategory = req.params.subcategory;
    const category = req.params.name;
    if (!req.session.cart) {
      req.session.cart = [];
    }
    db.query(
      "SELECT id,image,name,name_ar,price FROM `product` WHERE subcategory = ?",
      [subcategory],
      (err, result) => {
        if (err) throw err;
        const CartLength = req.session.cart.length;
        res.render("Product", {
          products: result,
          subcate: subcategory,
          cate: category,
          cartL: CartLength,
        });
      }
    );
  },
  deleteOne: (req, res) => {
    const { name } = req.params;
    db.query(
      "DELETE FROM `category` WHERE `category`.`name` = ?",
      [name],
      (err, result) => {
        if (err) throw err;
        res.json({
          message: name + " has been deleted",
        });
      }
    );
  },
  getAll: (req, res) => {
    db.query("SELECT * FROM `category`", (err, result) => {
      if (err) throw err;
      if (!req.session.cart) {
        req.session.cart = [];
      }
      const CartLength = req.session.cart.length;
      res.render("index", { category: result, cartL: CartLength });
    });
  },
};

module.exports = controller;
