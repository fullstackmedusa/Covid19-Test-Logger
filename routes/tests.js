const express = require("express");
const router = express.Router();
const testsCtrl = require("../controllers/tests");

router.post("/profile", testsCtrl.create);

router.delete("/profile/tests/:testsId", testsCtrl.delete);

module.exports = router;