const db = require("../db/index");

const controller = {
  addOne: (req, res) => {
    const { image, name_ar } = req.body;
    db.query(
      "INSERT INTO `category` ( `image`, `name_ar`) VALUES ( ?, ?)",
      [image, name_ar],
      (err, result) => {
        if (err) throw err;
        res.send(`
    <script>
      window.history.back();
      location.reload()
    </script>`);
      }
    );
  },
  getOne: (req, res) => {
    const { category } = req.params;
    db.query(
      "SELECT * FROM `subcategory` WHERE `category` = ?",
      [category],
      (err, result) => {
        if (err) throw err;
        res.render("Category", {
          subcategory: result,
          name: category,
        });
      }
    );
  },
  getProducts: (req, res) => {
    const subcategory = req.params.subcategory;
    const category = req.params.category;
    db.query(
      "SELECT id,image,name_ar,price FROM `product` WHERE (subcategory, category) = (?, ?)",
      [subcategory, category],
      (err, result) => {
        if (err) throw err;

        res.render("Product", {
          products: result,
          subcate: subcategory,
          cate: category,
        });
      }
    );
  },
  getAll: (req, res) => {
    db.query(
      "SELECT * FROM `category`; SELECT * FROM `offer`",
      (err, result) => {
        if (err) throw err;
        res.render("index", {
          category: result[0],
          offers: result[1],
        });
      }
    );
  },
  editCategory: (req, res) => {
    const { categoryid, name, image } = req.body;
    console.log(req.body);
    db.query(
      "UPDATE `category` SET `image` = ?, `name_ar` = ? WHERE `category`.`id` = ?",
      [image, name, categoryid],
      (err, result) => {
        if (err) throw err;
        res.send(`
    <script>
      window.history.back();
      location.reload()
    </script>`);
      }
    );
  },
};

module.exports = controller;
