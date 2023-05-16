const db = require("../db/index");
//! functiaons {

function isProductInCart(cart, id) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id == id) {
      return true;
    }
  }
  return false;
}

function calcluteTotal(cart, req) {
  total = 0;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].price) {
      total = total + cart[i].price * cart[i].quantity;
    }
  }
}

//! }

const controller = {
  addOne: (req, res) => {
    const { subcategory, image, name, name_ar, dis, dis_ar, price, instock } =
      req.body;

    db.query(
      "INSERT INTO `product` (`subcategory`, `image`, `name`, `name_ar`, `dis`, `dis_ar`, `price`, `instock`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [subcategory, image, name, name_ar, dis, dis_ar, price, instock],
      (err, result) => {
        if (err) throw err;
        res.json({
          message: name + " has been made successfully",
        });
      }
    );
  },
  getOne: (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM `product` WHERE id = ?", id, (err, result) => {
      if (err) throw err;

      res.render("Product/id", {
        product: result[0],
      });
    });
  },
  deleteOne: (req, res) => {
    const { id } = req.params;
    db.query(
      "DELETE FROM product WHERE `product`.`id` = ?",
      [id],
      (err, result) => {
        if (err) throw err;
        res.json({
          message: id + "has been deleted",
        });
      }
    );
  },
  getCode: (req, res) => {
    const { code } = req.body;
    db.query(
      "SELECT * FROM `promocode` WHERE code = ?",
      [code],
      (err, result) => {
        if (err) throw err;

        res.json({
          data: result,
        });
      }
    );
  },
  getCart: (req, res) => {
    var cart = req.session.cart;
    var total = req.session.total;

    res.render("cart.ejs", { cart: cart, total: total });
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

      if (!isProductInCart(cart, id)) {
        cart.push(product);
      }
    } else {
      req.session.cart = [product];
      var cart = req.session.cart;
    }

    //! calculate total
    calcluteTotal(cart, req);

    //? return to cart page
    res.redirect("/product/cart");
  },
};

module.exports = controller;
