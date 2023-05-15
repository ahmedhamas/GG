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
        res.json({
          data: result,
          name: name,
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
};

module.exports = controller;
