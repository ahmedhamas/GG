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
    const auth = req.cookies.Status;
    const admin = req.cookies.StateM;
    const { category } = req.params;
    db.query(
      "SELECT * FROM `subcategory` WHERE `category` = ?",
      [category],
      (err, result) => {
        if (err) throw err;

        if (admin !== undefined) {
          res.render("Category", {
            subcategory: result,
            name: category,
            auth: true,
            admin: true,
          });
        } else {
          if (auth !== undefined) {
            res.render("Category", {
              subcategory: result,
              name: category,
              auth: true,
              admin: false,
            });
          } else {
            res.render("Category", {
              subcategory: result,
              name: category,
              auth: false,
              admin: false,
            });
          }
        }
      }
    );
  },
  getProducts: (req, res) => {
    const subcategory = req.params.subcategory;
    const category = req.params.category;
    const auth = req.cookies.Status;
    const admin = req.cookies.StateM;
    db.query(
      "SELECT id,image,name_ar,price FROM `product` WHERE subcategory = ?",
      [subcategory],
      (err, result) => {
        if (err) throw err;
        if (admin !== undefined) {
          res.render("Product", {
            products: result,
            subcate: subcategory,
            cate: category,
            auth: true,
            admin: true,
          });
        } else {
          if (auth !== undefined) {
            res.render("Product", {
              products: result,
              subcate: subcategory,
              cate: category,
              auth: true,
              admin: false,
            });
          } else {
            res.render("Product", {
              products: result,
              subcate: subcategory,
              cate: category,
              auth: false,
              admin: false,
            });
          }
        }
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
    const auth = req.cookies.Status;
    const admin = req.cookies.StateM;
    db.query("SELECT * FROM `category`", (err, result) => {
      if (err) throw err;
      if (admin !== undefined) {
        res.render("index", {
          category: result,
          auth: true,
          admin: true,
        });
      } else {
        if (auth !== undefined) {
          res.render("index", {
            category: result,
            auth: true,
            admin: false,
          });
        } else {
          res.render("index", {
            category: result,
            auth: false,
            admin: false,
          });
        }
      }
    });
  },
};

module.exports = controller;
