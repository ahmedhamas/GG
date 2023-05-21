const db = require("../db/index");

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
      `SELECT * FROM product WHERE name_ar LIKE '%${Searchquery}%'`,
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
