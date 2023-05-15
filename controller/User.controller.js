const db = require("../db/index");
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");

const controller = {
  Register: (req, res) => {
    const { name, email, password } = req.body;
    db.query(
      "SELECT * FROM `users` WHERE email = ?",
      [email],
      (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
          res.json({ success: 0 });
        } else {
          const pass = crypto.createHmac("sha256", password).digest("hex");
          const id = uuidv4();
          db.query(
            "INSERT INTO `users` (`id`, `name`, `email`, `password`) VALUES (?, ?, ?, ?)",
            [id, name, email, pass],
            (err, result) => {
              if (err) throw err;
              res.json({
                success: 1,
              });
            }
          );
        }
      }
    );
  },
  Login: (req, res) => {
    const { email, password } = req.body;
    const pass = crypto.createHmac("sha256", password).digest("hex");
    db.query(
      "SELECT email,isManger,isStuff FROM `users` WHERE (`email`, `password`) = (?, ?)",
      [email, pass],
      (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
          const token = crypto
            .createHmac("sha256", result[0].email)
            .digest("hex");
          const mangerToken = crypto
            .createHmac("sha256", result[0].isManger.toString())
            .digest("hex");
          const stuffToken = crypto
            .createHmac("sha256", result[0].isStuff.toString())
            .digest("hex");
          res.json({
            success: 1,
            token: token,
            manger: mangerToken,
            stuff: stuffToken,
          });
        } else {
          res.json({
            success: 0,
          });
        }
      }
    );
  },
  getLogin: (req, res) => {
    res.render("login");
  },
  getOne: (req, res) => {
    const { token } = req.params;
    db.query("SELECT * FROM users WHERE token = ?", [token], (err, result) => {
      if (err) throw err;
      res.json({
        data: result,
      });
    });
  },
  deleteOne: (req, res) => {
    const { id } = req.params;
    console.log(id);
    db.query(
      "DELETE FROM `users` WHERE `users`.`id` = ?",
      [id],
      (err, result) => {
        if (err) throw err;
        res.json({
          message: id + " has been deleted",
        });
      }
    );
  },
  getAll: (req, res) => {
    db.query("SELECT * FROM users", (err, result) => {
      if (err) throw err;
      res.json({
        data: result,
      });
    });
  },
};

module.exports = controller;
