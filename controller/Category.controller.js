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
    db.query(
      "SELECT * FROM `subcategory` WHERE `category` = ?",
      [name],
      (err, result) => {
        if (err) throw err;
        res.render("Category", {
          subcategory: result,
          name: name,
        });
      }
    );
  },
  getProducts: (req, res) => {
    const subcategory = req.params.subcategory;
    const category = req.params.name;
    db.query(
      "SELECT id,image,name,name_ar,price FROM `product` WHERE subcategory = ?",
      [subcategory],
      (err, result) => {
        if (err) throw err;
        res.render("Product", {
          products: result,
          subcate: subcategory,
          cate: category,
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
      res.render("index", { category: result });
    });
  },
  AddToCart: (req, res) => {
    const { id, name, price, image, quantity } = req.body;
    const product = {
      id: id,
      name: name,
      price: price,
      image: image,
      quantity: quantity,
    };

    if (req.session.cart) {
      var cart = req.session.cart;

      if (isProductInCart(cart, id)) {
        cart.push(product);
      }
    } else {
      req.session.cart = [product];
      var cart = req.session.cart;
    }

    //! calculate total
    calcluteTotal(cart, req);

    //? return to cart page
    res.redirect("/cart");
  },
  getCart: (req, res) => {
    var cart = req.session.cart;
    var total = req.session.total;

    res.render("cart", { cart: cart, total: total });
  },
};

module.exports = controller;
