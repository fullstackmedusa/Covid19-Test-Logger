const express = require("express");
const router = express.Router();
const testsCtrl = require("../controllers/tests");

router.delete("/profile/tests/:id",testsCtrl.delete);
router.post("/", testsCtrl.create);

router.get("/:id/show", testsCtrl.show);

router.get("/new",testsCtrl.new)


module.exports = router;