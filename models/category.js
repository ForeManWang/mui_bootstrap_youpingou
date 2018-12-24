var db = require('./db.js');

function Category(category) {
  this.id = category.id;
  this.categoryName = category.categoryName;
  this.isDelete = category.isDelete;
};
Category.queryTopCategory = function (callback) {
    var selectSql = 'select * from category where isDelete=1';
    db.query(selectSql, function (err, result) {
        if (err) {
            return callback(err);
        }
        var data = result;
        callback(err, data);
    });
};
Category.querySecondCategory = function (id,callback) {
    var selectSql = 'select * from brand where categoryId=? and isDelete=1';
    db.query(selectSql,[id],function (err, result) {
        if (err) {
            return callback(err);
        }
        console.log(data);
        var data = result;
        callback(err, data);
    });
};
// Category.queryHotSecondCategory = function (id,callback) {
//     var selectSql = 'select * from brand where categoryId=? and isDelete=1 and hot=1';
//     db.query(selectSql,[id],function (err, result) {
//         if (err) {
//             return callback(err);
//         }
//         console.log(data);
//         var data = result;
//         callback(err, data);
//     });
// };
Category.addTopCategory = function (category, callback) {
  var selectSql = 'insert into category (id,categoryName,isDelete)  values (null,?,1)';
  db.query(selectSql, [category.categoryName], function (err, result) {
    if (err) {
      return callback(err);
    }
    callback(err, result);
  });
};
Category.updateTopCategory = function (category, callback) {
  var selectSql = 'UPDATE category SET';
  var param = new Array();
  if (category.categoryName) {
    selectSql += ' categoryName=? ';
    param[param.length] = category.categoryName;
  }
   if (category.isDelete && param.length == 0) {
    selectSql += ' isDelete=? ';
    param[param.length] = category.isDelete;
  }
  else if (category.isDelete && param.length != 0) {
    selectSql += ' ,isDelete=? ';
    param[param.length] = category.isDelete;
  }
  selectSql+= ' where id=?';
  param[param.length] = category.id;
  db.query(selectSql,param, function (err, result) {
    if (err) {
      return callback(err);
    }
    callback(err, result);
  });
};

Category.queryTopCategoryPaging = function (page,callback) {
    var selectSql = 'select * from category order by id desc';
	  selectSql  += " LIMIT ?,?";
    db.query(selectSql,[(page.page - 1) * page.size,page.size], function (err, result) {
        if (err) {
            return callback(err);
        }
        var data = result;
        callback(err, data);
    });
};
Category.countTopCategory = function (callback) {
    var selectSql = 'select count(*) as count from category ';
    db.query(selectSql, function (err, result) {
        if (err) {
            return callback(err);
        }
        var data = result[0];
        callback(err, data);
    });
};
Category.querySecondCategoryPaging = function (page,callback) {
    var selectSql = 'SELECT b.*,c.categoryName FROM brand AS b LEFT JOIN category AS c ON b.categoryId=c.id order by b.id desc';
    selectSql  += " LIMIT ?,?";
    db.query(selectSql,[(page.page - 1) * page.size,page.size],function (err, result) {
        if (err) {
            return callback(err);
        }
        console.log(data);
        var data = result;
        callback(err, data);
    });
};
Category.countSecondCategory = function (callback) {
    var selectSql = 'select count(*) as count from brand ';
    db.query(selectSql, function (err, result) {
        if (err) {
            return callback(err);
        }
        var data = result[0];
        callback(err, data);
    });
};
module.exports = Category;
