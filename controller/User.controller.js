const db = require("../db/index");
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");

const controller = {
  Register: (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const password2 = req.body.password2;

    if (password != password2) {
      res.json({ success: 0, message: "كلمات السر لا تتطابق" });
    } else {
      db.query(
        "SELECT * FROM `users` WHERE email = ?",
        [email],
        (err, result) => {
          if (err) throw err;
          if (result.length > 0) {
            res.json({ success: 0, message: "البريد الإلكتروني مسجل بالفعل" });
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
    }
  },
  Login: (req, res) => {
    const { email, password } = req.body;
    const pass = crypto.createHmac("sha256", password).digest("hex");
    db.query(
      "SELECT id,isManger FROM `users` WHERE (`email`, `password`) = (?, ?)",
      [email, pass],
      (err, result) => {
        if (err) throw err;
        const StateM = crypto
          .createHmac("sha256", result[0].isManger.toString())
          .digest("hex");
        if (result.length > 0) {
          res.json({
            success: 1,
            user: result[0].id,
            StateM: StateM,
          });
        } else {
          res.json({
            success: 0,
            message: "لا يمكن تسجيل الدخول بالمعلومات المقدمة",
          });
        }
      }
    );
  },
  getLogin: (req, res) => {
    res.render("User/login.ejs");
  },
  getRegister: (req, res) => {
    res.render("User/register");
  },
};

module.exports = controller;
