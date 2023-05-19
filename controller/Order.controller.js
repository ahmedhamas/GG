const db = require("../db/index");
const { v4: uuidv4 } = require("uuid");

const controller = {
  addOne: (req, res) => {
    const { city, address, phone, phone2, user, total, date } = req.body;
    const id = uuidv4();
    db.query("SELECT * FROM users WHERE id = ?", [user], (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        db.query(
          "INSERT INTO `orders` (`id`, `user`, `City`, `Address`, `phone`, `phone2`, `total`,`date`) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [id, user, city, address, phone, phone2, total, date],
          (err, result) => {
            if (err) throw err;
            res.json({
              success: 1,
              orderId: id,
            });
            console.log(result);
          }
        );
      } else {
        res.json({
          success: 0,
        });
      }
    });
  },
  addItems: (req, res) => {
    const { product, order, quantity } = req.body;
    db.query(
      "INSERT INTO `orderitem` (`product`, `orders`, `quantity`) VALUES (?, ?, ?)",
      [product, order, quantity],
      (err, result) => {
        res.json({
          success: 1,
        });
      }
    );
  },
  getSuccess: (req, res) => {
    res.render("Checkout/success");
  },
  getOne: (req, res) => {
    const token = req.params;
    db.query(
      "SELECT token FROM `users` WHERE (email, password) = (?, ?)",
      token,
      (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
          res.json({
            message: "You are successfully logged in",
          });
        } else {
          res.json({
            message: "can't login with provided email and password",
          });
        }
      }
    );
  },
  deleteOne: (req, res) => {
    const id = req.params;
    db.query(
      "DELETE FROM users WHERE `users`.`id` = ?",
      [id],
      (err, result) => {
        if (err) throw err;
        res.json({
          message: id + "has been deleted",
        });
      }
    );
  },
  getAll: (req, res) => {
    db.query("SELECT * FROM user", (err, result) => {
      if (err) throw err;
      res.json({
        data: result,
      });
    });
  },
  getCash: (req, res) => {
    res.render("Checkout/cash.ejs");
  },
};

module.exports = controller;
