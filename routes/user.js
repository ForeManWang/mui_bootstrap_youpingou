var express = require('express'),
  router = express.Router(),
  crypto = require('crypto'),
  Page= require('../models/page.js'),
  User = require('../models/user.js');


function checkRootLogin(req, res, next) {
  if (!req.session.employee) {
    return res.send({ "error": 400, "message": "未登录！" });
  }
  next();
}
function checkUserLogin(req, res, next) {
  if (!req.session.user) {
    return res.send({ "error": 400, "message": "未登录！" });
  }
  next();
}

router.post("/register", function (req, res) {
  if (!req.session.vCode||req.session.vCode!=req.body.vCode) return res.send({ "error": 401, "message": "验证码错误!" });
  if (!req.body.username) return res.send({ "error": 403, "message": "用户名未填写！" });
  if (!req.body.password)  return res.send({ "error": 403, "message": "密码未填写！" });
  if (!req.body.mobile)  return res.send({ "error": 403, "message": "用户手机号未填写！" });
  //密码加密
  var md5 = crypto.createHash('md5');
  var password = md5.update(req.body.password).digest('base64');

  var newUser = new User({
    username: req.body.username,
    password: password,
    mobile: req.body.mobile,
    isDelete: 1,
  });

  User.getUserByName(req.body.username, function (err, result) {
    if (err) return res.send({ "error": 403, "message": "数据库异常！" });
    if (result.length > 0) return res.send({ "error": 403, "message": "用户名已经存在!!!" });
    else {
      User.getUserByMobile(req.body.mobile, function (err, result) {
        console.log(result);
        if (err) return res.send({ "error": 403, "message": "数据库异常！" });
        if (result.length > 0) return res.send({ "error": 403, "message": "手机号已注册过!!!" });
        else {
          User.addUser(newUser, function (err, data) {
            if (err) return res.send({ "error": 403, "message": "数据库异常！" });
            newUser.id = data.insertId;
            req.session.user = newUser;
            res.send({ "success": true });
          })
        }
      });
    }
  });
});

router.post("/login", function (req, res) {
  var md5 = crypto.createHash('md5');
  var password = md5.update(req.body.password).digest('base64');
  User.getUserByName(req.body.username, function (err, result) {
    if (result.length ==0) return res.send({ "error": 403, "message": "用户名不存在! " });
    if (result[0].password != password) return res.send({ "error": 403, "message": "密码错误！" });

    req.session.user = result[0];
    console.log(req.session.user);
    res.send({ "success": true });
  });
});

router.get("/logout", function (req, res) {
  req.session.user = null;
  res.send({ "success": true });
});


router.post("/updatePassword", checkUserLogin);
router.post("/updatePassword", function (req, res) {
  if (!req.session.vCodePassword||req.session.vCodePassword!=req.body.vCode) return res.send({ "error": 401, "message": "验证码错误!" });
  var md51 = crypto.createHash('md5');
  var oldPassword = md51.update(req.body.oldPassword).digest('base64');
  var md52 = crypto.createHash('md5');
  var newPassword = md52.update(req.body.newPassword).digest('base64');
  var id = req.session.user.id;
  User.getUserById(id, function (err, result) {
    if (result.password != oldPassword) return res.send({ "error": 403, "message": "密码错误!" });
    User.updatePassword(id, newPassword, function (err, data) {
      if (err) return res.send({ "error": 403, "message": "数据库异常!" });
      req.session.user = null;
      res.send({ "success": true });
    })
  });
});
router.post("/updateUser", checkRootLogin);
router.post("/updateUser", function (req, res) {
  var newUser = new User({
    id: req.body.id,
    isDelete: req.body.isDelete
  });
  User.updateUser(newUser, function (err, result) {
    if (err) return res.send({ "error": 403, "message": "数据库异常!" });
    res.send({ "success": true });
  });
});
router.post("/queryUser", checkRootLogin);
router.get("/queryUser", function (req, res) {
  console.log("====="+Page);
  var page = new Page({
    page: req.query.page ? parseInt(req.query.page) : 0,
    size: req.query.pageSize ? parseInt(req.query.pageSize) : 10,
  })
  User.queryUser(page, function (err, data) {
    if (err) return res.send({ "error": 403, "message": "数据库异常!" });
    User.countUser(function (err, result) {
      if (err) return res.send({ "error": 403, "message": "数据库异常！" });
      page.total = result.count;
      page.rows = data;
      console.log(page);
      res.send(page);
    });
  });
});
router.get("/queryUserMessage", checkUserLogin);
router.get("/queryUserMessage", function (req, res) {
  User.queryUserMessage(req.session.user.id, function (err, data) {
    if (err) return res.send({ "error": 403, "message": "数据库异常!" });
    res.send(data);
  });
});
var createCode = function () {
  var code = "";
  var codeLength = 6;//验证码的长度   
  var random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);//随机数  
  for (var i = 0; i < codeLength; i++) {//循环操作  
    var index = Math.floor(Math.random() * 10);//取得随机数的索引（0~35）  
    code += random[index];//根据索引取得随机数加到code上  
  }
  return code;
}
router.get("/vCode", function (req, res) {
  var code = createCode();
  req.session.vCode = code;
  res.send({ "vCode": code });
});
router.get("/vCodeForUpdatePassword", function (req, res) {
  var code = createCode();
  req.session.vCodePassword = code;
  res.send({ "vCode": code });
});
module.exports = router;
