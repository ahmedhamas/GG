const db = require("../db/index");

const controller = {
  addOne: (req, res) => {
    const { category, subcategory, name_ar, dis_ar, price, image } = req.body;
    console.log();
    db.query(
      "INSERT INTO `product` (`category`, `subcategory`, `image`, `name_ar`,  `dis_ar`, `price` ) VALUES ( ?, ?, ?, ?, ?,?)",
      [category, subcategory, image, name_ar, dis_ar, price],
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
  addOffer: (req, res) => {
    const { product, image } = req.body;
    console.log(req.body);
    db.query(
      "INSERT INTO `offer` ( `imageUrl`,  `product` ) VALUES (?,?)",
      [image, product],
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
  addPromo: (req, res) => {
    const { code, value } = req.body;
    console.log(req.body);
    db.query(
      "INSERT INTO `promocode` ( `code`,  `value` ) VALUES (?,?)",
      [code, value],
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
    const { id } = req.params;
    db.query("SELECT * FROM `product` WHERE id = ?", id, (err, result) => {
      if (err) throw err;

      res.render("Product/id", {
        product: result[0],
      });
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
  editProduct: (req, res) => {
    const { id, name_ar, dis_ar, price } = req.body;
    db.query(
      "UPDATE `product` SET `name_ar` = ?, `dis_ar` = ?, `price` = ? WHERE `product`.`id` = ?",
      [name_ar, dis_ar, price, id],
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
  editOffer: (req, res) => {
    const { id, product } = req.body;
    db.query(
      "UPDATE `offer` SET `product` = ? WHERE `offer`.`id` = ?",
      [image, product, id],
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
  editPromo: (req, res) => {
    const { id, code, value } = req.body;
    db.query(
      "UPDATE `promocode` SET `code` = ?, `value` = ? WHERE `promocode`.`id` = ?",
      [code, value, id],
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
