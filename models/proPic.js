var db = require('./db.js');


function ProPic(pic) {
	this.id = pic.id;
	this.picName = pic.picName;
    this.picAddr = pic.picAddr;
	this.productId = pic.productId;
};
ProPic.addPic = function (pic, callback) {
  var selectSql = 'insert into product_picture (id,picName,productId,picAddr)  values (null,?,?,?)';
  db.query(selectSql, [pic.picName, pic.productId, pic.picAddr], function (err, result) {
    if (err) {
      console.log(err);
      return callback(err);
    }
    callback(err, result);
  });
};
ProPic.queryPic = function (proId, callback) {
  var selectSql = 'SELECT * FROM product_picture WHERE productId in('+proId+')';
  console.log(selectSql);
  db.query(selectSql, function (err, result) {
    if (err) {
      return callback(err);
    }
    callback(err, result);
  });
};
ProPic.delPic = function (proId, callback) {
  var selectSql = 'DELETE FROM product_picture WHERE  productId =?';
  db.query(selectSql,[proId],function (err, result) {
    if (err) {
      return callback(err);
    }
    callback(err, result);
  });
};

module.exports = ProPic;
