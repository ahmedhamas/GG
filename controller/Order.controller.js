const db = require("../db/index");
const { v4: uuidv4 } = require("uuid");

const controller = {
  addOne: (req, res) => {
    const {
      city,
      address,
      phone,
      phone2,
      user,
      total,
      cart,
      where,
      delivered,
      paid,
    } = req.body;
    const id = uuidv4();
    console.log({ city, address, phone, phone2, user, total, cart, where });
    const date = new Date().toISOString().slice(0, 19).replace("T", " ");
    db.query("SELECT * FROM users WHERE id = ?", [user], (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        console.log(result);
        db.query(
          "INSERT INTO `orders` (`id`, `users`, `City`, `Address`, `phone`, `phone2`, `total`, `date`, `cart`, `where`, `delivered`, `paid`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            id,
            user,
            city,
            address,
            phone,
            phone2,
            total,
            date,
            cart,
            where,
            delivered,
            paid,
          ],
          (err, result) => {
            if (err) throw err;
            console.log(result);
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
  getCash: (req, res) => {
    res.render("Checkout/cash.ejs");
  },
  editDelivered: (req, res) => {
    const { id, isDelivered } = req.body;
    db.query(
      "UPDATE `orders` SET `delivered` = ? WHERE `orders`.`id` = ?",
      [isDelivered, id],
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
  editPaid: (req, res) => {
    const { id, isPaid } = req.body;
    db.query(
      "UPDATE `orders` SET `paid` = ? WHERE `orders`.`id` = ?",
      [isPaid, id],
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
  getCitysOrders: (req, res) => {
    const city = req.body.city;
    db.query(
      "SELECT * FROM `orders` WHERE City = ? LIMIT 0,50",
      [city],
      (err, result) => {
        if (err) throw err;
        res.json({
          data: result,
        });
      }
    );
  },
  getCreditCard: (req, res) => {
    res.render("Checkout/paypal", {
      paypalClientId: process.env.PAYPAL_CLIENT_ID,
    });
  },
  postPaypal: (req, res) => {
    console.log(req);
  },
};

module.exports = controller;
