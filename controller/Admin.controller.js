const db = require("../db/index");

const controller = {
  //! GET {
  getProducut: (req, res) => {
    const token = req.params.admin;
    db.query(
      "SELECT isManger FROM users WHERE id=?",
      [token],
      (err, result) => {
        if (err) throw err;
        if (result[0].isManger === 1) {
          res.render("admin/products");
        } else {
          res.redirect("/");
        }
      }
    );
  },
  getOrders: (req, res) => {
    const token = req.params.admin;
    db.query(
      "SELECT isManger FROM users WHERE id=? LIMIT 0,50",
      [token],
      (err, result) => {
        if (err) throw err;
        if (result[0].isManger === 1) {
          db.query("SELECT * FROM orders", (err, result) => {
            if (err) throw err;
            res.render("admin/orders", { orders: result });
          });
        } else {
          res.redirect("/");
        }
      }
    );
  },
  getCategory: (req, res) => {
    const token = req.params.admin;
    db.query(
      "SELECT isManger FROM users WHERE id=?",
      [token],
      (err, result) => {
        if (err) throw err;
        if (result[0].isManger === 1) {
          db.query("SELECT * FROM category", (err, result) => {
            if (err) throw err;
            res.render("admin/category", { category: result });
          });
        } else {
          res.redirect("/");
        }
      }
    );
  },
  getSubCategory: (req, res) => {
    const token = req.params.admin;
    db.query(
      "SELECT isManger FROM users WHERE id=?",
      [token],
      (err, result) => {
        if (err) throw err;
        if (result[0].isManger === 1) {
          db.query(
            "SELECT * FROM subcategory; SELECT name_ar FROM category",
            (err, result) => {
              if (err) throw err;
              res.render("admin/subcategory", {
                subcategory: result[0],
                category: result[1],
              });
            }
          );
        } else {
          res.redirect("/");
        }
      }
    );
  },
  getUser: (req, res) => {
    const token = req.params.admin;
    db.query(
      "SELECT isManger FROM users WHERE id=?",
      [token],
      (err, result) => {
        if (err) throw err;
        if (result[0].isManger === 1) {
          db.query("SELECT * FROM users", (err, result) => {
            if (err) throw err;
            res.render("admin/users", { users: result });
          });
        } else {
          res.redirect("/");
        }
      }
    );
  },
  getAdmin: (req, res) => {
    const token = req.params.admin;
    db.query(
      "SELECT isManger FROM users WHERE id=?",
      [token],
      (err, result) => {
        if (err) throw err;
        if (result[0].isManger === 1) {
          res.render("admin");
        } else {
          res.redirect("/");
        }
      }
    );
  },
  //! }
  //! SEARCH {
  searchUsers: (req, res) => {
    const Searchquery = req.body.searchUser;
    console.log(Searchquery);
    db.query(
      `SELECT * FROM users WHERE email LIKE '%${Searchquery}%'`,
      (err, result) => {
        if (err) throw err;
        res.json({
          data: result,
        });
      }
    );
  },
  searchProduct: (req, res) => {
    const Searchquery = req.body.searchProduct;
    db.query(
      `SELECT * FROM product WHERE name_ar LIKE '%${Searchquery}%'`,
      (err, result) => {
        if (err) throw err;
        res.json({
          data: result,
        });
      }
    );
  },
  searchOrders: (req, res) => {
    const Searchquery = req.body.searchUser;
    db.query(
      `SELECT * FROM orders WHERE id OR users LIKE '%${Searchquery}%' LIMIT 0,50`,
      (err, result) => {
        if (err) throw err;
        res.json({
          data: result,
        });
      }
    );
  },
  //!}
  //! DELETE {
  deleteUser: (req, res) => {
    const id = req.body.userid;
    db.query(
      "DELETE FROM `users` WHERE `users`.`id` = ?",
      [id],
      (err, result) => {
        if (err) throw err;
        res.send(`
        <script>
        alert("${id}  has been deleted") 
          window.history.back();
          location.reload()
        </script>`);
      }
    );
  },
  deleteProduct: (req, res) => {
    const id = req.body.productid;
    db.query(
      "DELETE FROM `product` WHERE `product`.`id` = ?",
      [id],
      (err, result) => {
        if (err) throw err;
        res.send(`
        <script>
        alert("${id}  has been deleted") 
          window.history.back();
          location.reload()
        </script>`);
      }
    );
  },
  deleteCategory: (req, res) => {
    const id = req.body.categoryid;
    db.query(
      "DELETE FROM `category` WHERE `category`.`id` = ?",
      [id],
      (err, result) => {
        if (err) throw err;
        res.send(`
        <script>
        alert("${id}  has been deleted") 
          window.history.back();
          location.reload()
        </script>`);
      }
    );
  },
  deleteSubcategory: (req, res) => {
    const id = req.body.subcategoryid;
    db.query(
      "DELETE FROM `subcategory` WHERE `subcategory`.`id` = ?",
      [id],
      (err, result) => {
        if (err) throw err;
        res.send(`
        <script>
        alert("${id}  has been deleted") 
          window.history.back();
          location.reload()
        </script>`);
      }
    );
  },
  deleteOrder: (req, res) => {
    const id = req.body.orderid;
    db.query(
      "DELETE FROM `orders` WHERE `orders`.`id` = ?",
      [id],
      (err, result) => {
        if (err) throw err;
        res.send(`
        <script>
        alert("${id}  has been deleted") 
          window.history.back();
          location.reload()
        </script>`);
      }
    );
  },
  //! }
};

module.exports = controller;
