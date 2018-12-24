var express = require('express'),
    router = express.Router(),
    crypto = require('crypto'),
    Employee = require('../models/employee.js');
router.get("/checkRootLogin", function (req, res) {
   if (!req.session.employee) {
       return res.send({ "error": 400, "message": "未登录！" });
    }
      res.send({ "success": true });
});


router.post("/employeeLogin", function (req, res) {
  var md5 = crypto.createHash('md5');
  var password = md5.update(req.body.password).digest('base64');
  Employee.getUserByName(req.body.username, function (err, result) {
    if (!result) return res.send({ "error": 1000, "message": "用户名不存在! " });
    if (result.password != password) return res.send({ "error": 1001, "message": "密码错误！" });
    req.session.employee = result;
    console.log(req.session.employee);
    res.send({ "success": true });
  });
});

router.get("/employeeLogout",function(req,res) {
    req.session.employee=null;
    res.send({ "success": true });
});
module.exports = router;
