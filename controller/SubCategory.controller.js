const db = require("../db/index");

const controller = {
  addOne: (req, res) => {
    const { category, name, name_ar, image } = req.body;
    db.query(
      "SELECT * FROM `subcategory` WHERE name = ?",
      [name],
      (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
          res.json({ message: "sorry this subcategory is already made" });
        } else {
          db.query(
            "INSERT INTO `subcategory` (`category`, `name`, `name_ar`, `image`) VALUES (?, ?, ?, ?)",
            [category, name, name_ar, image],
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
};

module.exports = controller;
