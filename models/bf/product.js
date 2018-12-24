var db = require('./db.js');
var moment = require('moment');

function Product(pro) {
	this.id = pro.id;
	this.proName = pro.proName;
	this.oldPrice = pro.oldPrice;
	this.price = pro.price;
	this.proDesc = pro.proDesc;
	this.size = pro.size;
	this.statu = pro.statu;
	this.updateTime = pro.updateTime;
	this.num = pro.num;
	this.brandId = pro.brandId;
};
Product.queryProductDetailList= function (product, page, callback) {
  var selectSql = "SELECT * FROM product WHERE 1=1";
  var param = new Array();
  if (product.proName) {
    selectSql = selectSql + " AND  proName LIKE ? ";
    param[0] = '%' + product.proName + '%';
  }
  if (product.brandId) {
    selectSql = selectSql + " AND  brandId =? ";
    param[param.length] = product.brandId;
  }
  if (product.price) {
    if (product.price == 1) selectSql = selectSql + " ORDER BY price ";
    if (product.price == 2) selectSql = selectSql + " ORDER BY price DESC ";
  }
  else if (product.num) {
    if (product.num == 1) selectSql = selectSql + " ORDER BY num ";
    if (product.num == 2) selectSql = selectSql + " ORDER BY num DESC ";
  }
  selectSql = selectSql + " LIMIT ?,?";
  param[param.length] = (page.page - 1) * page.size;
  param[param.length] = page.size;
  console.log(selectSql);
  console.log(param);
  db.query(selectSql, param, function (err, result) {
    if (err) {
      return callback(err);
    }
    var data = result;
    callback(err, data);
  });
};
Product.queryProduct = function (product, page, callback) {
	var selectSql = "SELECT * FROM product WHERE 1=1";
	var param = new Array();
	if (product.proName) {
		selectSql = selectSql + " AND  proName LIKE ? ";
		param[0] = '%'+product.proName+'%';
	}
	if (product.brandId) {
		selectSql = selectSql + " AND  brandId =? ";
		param[param.length] = product.brandId;
	}
	if (product.price) {
		if (product.price == 1) selectSql = selectSql + " ORDER BY price ";
		if (product.price == 2) selectSql = selectSql + " ORDER BY price DESC ";
	}
	else if (product.num) {
		if (product.num == 1) selectSql = selectSql + " ORDER BY num ";
		if (product.num == 2) selectSql = selectSql + " ORDER BY num DESC ";
	}
	selectSql = selectSql + " LIMIT ?,?";
	param[param.length]=(page.page-1)*page.size;
	param[param.length]=page.size;
	console.log(selectSql);
	console.log(param);
	db.query(selectSql, param, function (err, result) {
		if (err) {
			return callback(err);
		}
		var data = result;
		callback(err, data);
	});
};
Product.countProduct = function (callback) {
	var selectSql = 'SELECT count(id) as count FROM product WHERE 1=1';
	db.query(selectSql, function (err, result) {
		if (err) {
			return callback(err);
		}
		var data = result[0];
		callback(err, data);
	});
};
Product.queryProductDetail = function (id, callback) {
	var selectSql = 'SELECT * FROM product WHERE id = ?';
	db.query(selectSql, [id], function (err, result) {
		if (err) {
			return callback(err);
		}
		var data = result[0];
		callback(err, data);
	});
};
Product.addProduct = function (product, callback) {
  var selectSql = 'insert into product (id,proName,oldPrice,price,proDesc,size,statu,updateTime,num,brandId)  values (null,?,?,?,?,?,?,?,?,?)';
  db.query(selectSql, [product.proName, product.oldPrice, product.price, product.proDesc, product.size, product.statu, product.updateTime, product.num, product.brandId], function (err, result) {
    if (err) {
      console.log(err);
      return callback(err);
    }
    callback(err, result);
  });
};

Product.updateProduct = function (product, callback) {
  var selectSql = 'UPDATE product SET ';
  var param = new Array();
  if (product.proName) {
    selectSql += ' proName=? ';
    param[param.length] = product.proName;
  }
  if (product.oldPrice && param.length == 0) {
    selectSql += ' oldPrice=? ';
    param[param.length] = product.oldPrice;
  }
  else if (product.oldPrice && param.length != 0) {
    selectSql += ' ,oldPrice=? ';
    param[param.length] = product.oldPrice;
  }
  if (product.price && param.length == 0) {
    selectSql += ' price=? ';
    param[param.length] = product.price;
  }
  else if (product.price && param.length != 0) {
    selectSql += ' ,price=? ';
    param[param.length] = product.price;
  }
  if (product.proDesc && param.length == 0) {
    selectSql += ' proDesc=? ';
    param[param.length] = product.proDesc;
  }
  else if (product.proDesc && param.length != 0) {
    selectSql += ' ,proDesc=? ';
    param[param.length] = product.proDesc;
  }
  if (product.size && param.length == 0) {
    selectSql += ' size=? ';
    param[param.length] = product.size;
  }
  else if (product.size && param.length != 0) {
    selectSql += ' ,size=? ';
    param[param.length] = product.size;
  }
  if (product.statu && param.length == 0) {
    selectSql += ' statu=? ';
    param[param.length] = product.statu;
  }
  else if (product.statu && param.length != 0) {
    selectSql += ' ,statu=? ';
    param[param.length] = product.statu;
  }
  if (product.num && param.length == 0) {
    selectSql += ' num=? ';
    param[param.length] = product.num;
  }
  else if (product.num && param.length != 0) {
    selectSql += ' ,num=? ';
    param[param.length] = product.num;
  }
  if (product.brandId && param.length == 0) {
    selectSql += ' brandId=? ';
    param[param.length] = product.brandId;
  }
  else if (product.brandId && param.length != 0) {
    selectSql += ' ,brandId=? ';
    param[param.length] = product.brandId;
  }
  
  selectSql+=",updateTime='"+moment().format("YYYY-MM-DD HH:mm:ss")+"'";
  selectSql+=" where id=?";
  param[param.length] = product.id;
  db.query(selectSql,param, function (err, result) {
    if (err) {
      return callback(err);
    }
    callback(err, result);
  });
};
module.exports = Product;
