var express= require("express");
var router = express.Router();

const {requiresAuth} = require('express-openid-connect')
router.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

module.exports= router;