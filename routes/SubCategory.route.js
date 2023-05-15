const express = require("express");
const router = express.Router();
const SubCategory = require("../controller/SubCategory.controller");

router.get("/:name", SubCategory.getOne);
router.post("/", SubCategory.addOne);
router.delete("/:id", SubCategory.deleteOne);

module.exports = router;
