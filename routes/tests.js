const express = require("express");
const router = express.Router();
const testsCtrl = require("../controllers/tests");

router.post("/", testsCtrl.create);

router.get("/:id/show", testsCtrl.show);

router.get("/new",testsCtrl.new)


module.exports = router;