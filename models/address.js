var db = require('./db.js');

function Address(address) {
  this.id = address.id;
  this.userId = address.userId;
  this.address = address.address;
  this.addressDetail = address.addressDetail;
  this.isDelete = address.isDelete;
  this.recipients = address.recipients;
  this.postcode = address.postcode;
};

Address.addAddress = function (address, callback) {
  var selectSql = 'insert into address (id,userId,address,addressDetail,isDelete,recipients,postcode)  values (null,?,?,?,1,?,?)';
  db.query(selectSql, [address.userId, address.address, address.addressDetail,address.recipients,address.postcode], function (err, result) {
    console.log(err);
    if (err) {
      return callback(err);
    }
    callback(err, result);
  });
};
Address.updateAddress = function (address, callback) {
  var selectSql = 'UPDATE address SET  ';
    var param = new Array();
  if (address.address && param.length == 0) {
    selectSql += ' address=? ';
    param[param.length] = address.address;
  }
  if (address.addressDetail && param.length == 0) {
    selectSql += ' addressDetail=? ';
    param[param.length] = address.addressDetail;
  }
  else if (address.addressDetail && param.length != 0) {
    selectSql += ' ,addressDetail=? ';
    param[param.length] = address.addressDetail;
  }
   if (address.recipients && param.length == 0) {
    selectSql += ' recipients=? ';
    param[param.length] = address.recipients;
  }
  else if (address.recipients && param.length != 0) {
    selectSql += ' ,recipients=? ';
    param[param.length] = address.recipients;
  }
     if (address.postcode && param.length == 0) {
    selectSql += ' postcode=? ';
    param[param.length] = address.postcode;
  }
  else if (address.postcode && param.length != 0) {
    selectSql += ' ,postcode=? ';
    param[param.length] = address.postcode;
  }
     selectSql += ' WHERE id=? ';
   param[param.length] = address.id;
  db.query(selectSql,param, function (err, res) {
    if (err) {
      return callback(err);
    }
    callback(err, res);
  });
}
Address.deleteAddress = function (id, callback) {
  var delSql = "UPDATE address SET isDelete =0 WHERE id =?";
  db.query(delSql,[id],function (err, res) {
    if (err) {
      return callback(err);
    }
    callback(err, res);
  });
}
Address.queryAddress = function (userId, callback) {
  var selectSql = 'SELECT * FROM address WHERE userId=? AND isDelete=1';
  db.query(selectSql, [userId], function (err, res) {
    if (err) {
      return callback(err);
    }
    callback(err, res);
  });
}
module.exports = Address;
