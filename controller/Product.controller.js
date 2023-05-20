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
    const auth = req.cookies.Status;
    const admin = req.cookies.StateM;
    const { id } = req.params;
    db.query("SELECT * FROM `product` WHERE id = ?", id, (err, result) => {
      if (err) throw err;
      if (admin !== undefined) {
        res.render("Product/id", {
          product: result[0],
          auth: true,
          admin: true,
        });
      } else {
        if (auth !== undefined) {
          res.render("Product/id", {
            product: result[0],
            auth: true,
            admin: false,
          });
        } else {
          res.render("Product/id", {
            product: result[0],
            auth: false,
            admin: false,
          });
        }
      }
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
    res.render("cart.ejs");
  },
  searchProduct: (req, res) => {
    const Searchquery = req.body.search;
    db.query(
      `SELECT * FROM product WHERE name_ar OR price LIKE '%${Searchquery}%'`,
      (err, result) => {
        if (err) throw err;
        res.render("Product/search", {
          SearchedProduct: result,
          search: Searchquery,
        });
      }
    );
  },
};

module.exports = controller;
