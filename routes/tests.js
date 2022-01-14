const express = require("express");
const router = express.Router();
const testsCtrl = require("../controllers/tests");

router.delete("/:id",testsCtrl.delete);

router.post("/:id", testsCtrl.create);

router.get("/:id/show", testsCtrl.show);

router.get("/new/:id",testsCtrl.new)


module.exports = router;