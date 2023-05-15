const { json } = require("express");
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
    const { id } = req.params;
    db.query("SELECT * FROM `product` WHERE id = ?", id, (err, result) => {
      if (err) throw err;
      res.json({
        data: result,
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
};

module.exports = controller;
