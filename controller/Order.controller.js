const db = require("../db/index");
const { v4: uuidv4 } = require("uuid");

const controller = {
  addOne: (req, res) => {
    const { city, address, phone, phone2, user, total, cart } = req.body;
    const id = uuidv4();
    const date = new Date().toISOString().slice(0, 19).replace("T", " ");
    db.query("SELECT * FROM users WHERE id = ?", [user], (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        db.query(
          "INSERT INTO `orders` (`id`, `users`, `City`, `Address`, `phone`, `phone2`, `total`, `date`, `cart`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [id, user, city, address, phone, phone2, total, date, cart],
          (err, result) => {
            if (err) throw err;
            res.send(`<script>
            localStorage.setItem('cart','[]')
            location.replace('/pay/info/success')
          </script>`);
          }
        );
      }
    });
  },
  getSuccess: (req, res) => {
    res.render("Checkout/success");
  },
  getOrderHistory: (req, res) => {
    const userId = req.params.userId;
    const name = {};
    db.query("SELECT name FROM users WHERE id = ?", [userId], (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        Object.assign(name, result[0]);
        db.query(
          "SELECT * FROM `orders` WHERE users = ?",
          [userId],
          (err, result) => {
            if (err) throw err;
            res.render("Checkout/orderhistory", { orders: result, name: name });
          }
        );
      }
    });
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
