const db = require("../db/index");

const controller = {
  addOne: (req, res) => {
    const { name, email, password } = req.body;
    db.query("SELECT * FROM user WHERE email = ?", [email], (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        res.json({ message: "sorry the account is already made" });
      } else {
        db.query(
          "INSERT INTO `users` (`id`, `name`, `email`, `password`) VALUES (?, ?, ?, ?)",
          [id, name, email, password],
          (err, result) => {
            if (err) throw err;
            res.json({
              data: result,
              message: "account has been made successfully",
            });
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
  updateOne: (req, res) => {
    const selectedId = req.params;
    const { id, name, email, password, isManger, isStuff, token } = req.body;
    db.query(
      "UPDATE `users` SET `id` = ?, `name` = ?, `email` = ?, `password` = ?, `isManger` = ?, `isStuff` = ?, `token` = ? WHERE `users`.`id` = ?"[
        (id, name, email, password, isManger, isStuff, token, selectedId)
      ],
      (err, result) => {
        if (err) throw err;
        res.json({
          message: selectedId + "has been updated",
        });
      }
    );
  },
};

module.exports = controller;
