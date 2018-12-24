var express = require('express'),
    router = express.Router(),
    Address = require('../models/address.js');

function checkUserLogin(req, res, next) {
    if (!req.session.user) {
       return res.send({ "error": 400, "message": "未登录！" });
    }
    next();
}
router.post("/addAddress",checkUserLogin);
router.post("/addAddress", function (req, res) {
    var address = new Address({
        userId: req.session.user.id,
        address: req.body.address ? req.body.address : '',
        addressDetail: req.body.addressDetail ? req.body.addressDetail : '',
        recipients: req.body.recipients ? req.body.recipients : '',
        postcode: req.body.postcode ? req.body.postcode : ''
    })
    Address.addAddress(address, function (err, data) {
        console.log(err);
        if (err) return res.send({ "error": 403, "message": "数据库异常！" });
        res.send({ "success": true });
    })
});
router.post("/updateAddress",checkUserLogin);
router.post("/updateAddress", function (req, res) {
    var address = new Address({
        id: req.body.id,
        address: req.body.address ? req.body.address : '',
        addressDetail: req.body.addressDetail ? req.body.addressDetail : '',
        recipients: req.body.recipients ? req.body.recipients : '',
        postcode: req.body.postcode ? req.body.postcode : ''
    })
    Address.updateAddress(address, function (err, data) {
        if (err) return res.send({ "error": 403, "message": "数据库异常！" });
        res.send({ "success": true });
    })
});

router.post("/deleteAddress",checkUserLogin);
router.post("/deleteAddress", function (req, res) {
    Address.deleteAddress(req.body.id, function (err, data) {
        console.log(req.body.id);
        if (err) return res.send({ "error": 403, "message": "数据库异常！" });
        res.send({ "success": true });
    })
});

router.get("/queryAddress",checkUserLogin);
router.get("/queryAddress", function (req, res) {
    Address.queryAddress(req.session.user.id, function (err, data) {
        if (err) return res.send({ "error": 403, "message": "数据库异常！" });
        res.send(data);
    })
});
router.get("/queryAddressTree",checkUserLogin);
router.get("/queryAddressTree", function (req, res) {
    res.send([{
        "id": 1, "areaName": "北京", "child": [
            { "id": 11, "areaName": "东城区", "child": [{ "id": 111, "areaName": "安定门街道" }, { "id": 112, "areaName": "建国门街道" }] },
            { "id": 12, "areaName": "西城区", "child": [{ "id": 121, "areaName": "德外街道" }, { "id": 122, "areaName": "金融街" }] },
            { "id": 13, "areaName": "朝阳区", "child": [{ "id": 131, "areaName": "朝外街道" }, { "id": 132, "areaName": "劲松街道" }] }]
    }, {
        "id": 2, "areaName": "天津", "child": [
            { "id": 21, "areaName": "和平区", "child": [{ "id": 211, "areaName": "南市街道" }, { "id": 212, "areaName": "新兴街道" }] },
            { "id": 22, "areaName": "南开区", "child": [{ "id": 221, "areaName": "八里台街" }, { "id": 222, "areaName": "王顶堤街" }] },
            { "id": 23, "areaName": "红桥区", "child": [{ "id": 231, "areaName": "西于庄街道" }, { "id": 232, "areaName": "双环村街道" }] }]
    }

    ]);

});


module.exports = router;