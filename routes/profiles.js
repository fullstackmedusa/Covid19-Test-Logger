var express = require("express");
var router = express.Router();

const profileCtrl = require("../controllers/profiles");


router.get('/', profileCtrl.index);

router.get('/edit/:id', profileCtrl.edit);

router.put('/edit/:id', profileCtrl.updateProfile);

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/auth/google");
  }
  
  module.exports = router;