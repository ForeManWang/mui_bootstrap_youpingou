'use strict'
var express = require('express'),
  router = express.Router(),
  Cart = require('../models/cart.js'),
  Page = require('../models/page.js'),
  ProPic = require('../models/proPic.js');

function checkUserLogin(req, res, next) {
  if (!req.session.user) {
    return res.send({ "error": 400, "message": "未登录！" });
  }
  next();
}
router.post("/addCart", checkUserLogin);
router.post("/addCart", function (req, res) {
  var cart = new Cart({
    userId: req.session.user.id,
    productId: req.body.productId ? req.body.productId : '',
    num: req.body.num ? parseInt(req.body.num) : '',
    size: req.body.size ? req.body.size : ''
  })
  Cart.addCart(cart, function (err, data) {
    if (err) return res.send({ "error": 403, "message": "数据库异常！" });
    res.send({ "success": true });
  })
});
router.post("/updateCart", checkUserLogin);
router.post("/updateCart", function (req, res) {
  var cart = new Cart({
    id: parseInt(req.body.id),
    num: req.body.num ? parseInt(req.body.num) : '',
    size: req.body.size ? req.body.size : ''
  })
  Cart.updateCart(cart, function (err, data) {
    if (err) return res.send({ "error": 403, "message": "数据库异常！" });
    res.send({ "success": true });
  })
});
router.get("/deleteCart", checkUserLogin);
router.get("/deleteCart", function (req, res) {
  Cart.deleteCart(req.query.id, function (err, data) {
    if (err) return res.send({ "error": 403, "message": "数据库异常！" });
    res.send({ "success": true });
  })
});
router.get("/queryCart", checkUserLogin);
router.get("/queryCart", function (req, res) {
  Cart.queryCart(req.session.user.id,  function (err, data) {
    if (err) return res.send({ "error": 403, "message": "数据库异常！" });
      if (data.length == 0) {
        return res.send(data);
      }
      var idStr = "";
      for (let i = 0; i < data.length; i++) {
        if (i == 0) {
          idStr += data[i].productId
        }
        else {
          idStr += "," + data[i].productId
        }
        data[i].pic = new Array();
      }
      console.log(idStr);
      ProPic.queryPic(idStr, function (err, picData) {
        if (err) return res.send({ "error": 403, "message": "数据库异常！" });
        for (let l = 0; l < picData.length; l++) {
          for (let n = 0; n < data.length; n++)
            if (data[n].productId == picData[l].productId) {
              data[n].pic[data[n].pic.length] = picData[l];
              console.log(picData[l]);
            }
        }
        res.send(data);
      })
    
  })
});
router.get("/queryCartPaging", checkUserLogin);
router.get("/queryCartPaging", function (req, res) {
  var page = new Page({
    page: req.query.page ? parseInt(req.query.page) : 0,
    size: req.query.pageSize ? parseInt(req.query.pageSize) : 10,
  })
  Cart.queryCartPaging(req.session.user.id, page, function (err, data) {
    if (err) return res.send({ "error": 403, "message": "数据库异常！" });
    Cart.countCart(req.session.user.id, function (err, result) {
      if (err) return res.send({ "error": 403, "message": "数据库异常！" });

      if (data.length == 0) {
        page.count = result.count;
        page.data = data;
        return res.send(data);
      }
      var idStr = "";
      for (let i = 0; i < data.length; i++) {
        if (i == 0) {
          idStr += data[i].productId
        }
        else {
          idStr += "," + data[i].productId
        }
        data[i].pic = new Array();
      }
      console.log(idStr);
      ProPic.queryPic(idStr, function (err, picData) {
        if (err) return res.send({ "error": 403, "message": "数据库异常！" });
        for (let l = 0; l < picData.length; l++) {
          for (let n = 0; n < data.length; n++)
            if (data[n].productId == picData[l].productId) {
              data[n].pic[data[n].pic.length] = picData[l];
              console.log(picData[l]);
            }
        }

        page.count = result.count;
        page.data = data;
        res.send(page);
      })
    })
  })
});

module.exports = router;