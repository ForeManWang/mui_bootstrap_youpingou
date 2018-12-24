var db = require('./db.js');

function Cart(cart) {
  this.id = cart.id;
  this.userId = cart.userId;
  this.productId = cart.productId;
  this.num = cart.num;
  this.size = cart.size;
  this.isDelete = cart.isDelete;
};

Cart.addCart = function (cart, callback) {
  var selectSql = 'insert into cart (id,userId,productId,num,size,isDelete)  values (null,?,?,?,?,1)';
  db.query(selectSql, [cart.userId, cart.productId, cart.num, cart.size], function (err, result) {
    if (err) {
      return callback(err);
    }
    callback(err, result);
  });
};
Cart.updateCart = function (cart, callback) {
  var selectSql = 'UPDATE cart SET num =?,size=? WHERE id=?';
  db.query(selectSql, [cart.num, cart.size, cart.id], function (err, res) {
    console.log(res);
    if (err) {
      console.log(err);
      return callback(err);
    }
    callback(err, res);
  });
}
Cart.deleteCart = function (id, callback) {
  /*var idStr = "";
  for (var i = 0; i < id.length; i++) {
    if (i == 0) {
      idStr = idStr + id[i];
    }
    else {
      idStr = idStr + "," + id[i];
    }
  }

  var delSql = "UPDATE cart SET isDelete =0 WHERE id in (" + idStr + ")";*/

  var delSql = "UPDATE cart SET isDelete =0 WHERE id = " + id;

  console.log(delSql);

  db.query(delSql, function (err, res) {
    if (err) {
      return callback(err);
    }
    callback(err, res);
  });
}
Cart.queryCartPaging = function (id, page, callback) {
  var selectSql = 'SELECT c.id,c.productId,c.num,c.size,p.proName,p.price,p.oldPrice,p.num as productNum,p.statu,p.size as productSize from cart as c left join product as p on c.productId=p.id where c.isDelete = 1 and c.userId=?';

  selectSql +=" LIMIT ?,?";
  db.query(selectSql, [id, (page.page - 1) * page.size, page.size],function (err, res) {
    if (err) {
      return callback(err);
    }
    callback(err, res);
  });
}
Cart.queryCart = function (id,callback) {
  var selectSql = 'SELECT c.id,c.productId,c.num,c.size,p.proName,p.price,p.oldPrice,p.num as productNum,p.statu,p.size as productSize from cart as c left join product as p on c.productId=p.id where c.userId=? and c.isDelete = 1';
  db.query(selectSql, [id],function (err, res) {
    if (err) {
      return callback(err);
    }
    callback(err, res);
  });
}
Cart.countCart = function (id, callback) {
  var delSql = 'SELECT count(c.id) as count from cart as c left join product as p on c.productId=p.id where  c.isDelete = 1 and  c.userId=?';
  db.query(delSql, [id], function (err, res) {
    if (err) {
      return callback(err);
    }
    callback(err, res[0]);
  });
}
module.exports = Cart;
