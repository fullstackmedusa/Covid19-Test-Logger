const express = require("express");
const router = express.Router();
const testsCtrl = require("../controllers/tests");

router.post("/profile", testsCtrl.create);


router.get("/new",testsCtrl.new)


module.exports = router;