var db = require('./db.js');


function User(user) {
	this.id=user.id;
	this.username = user.username;
	this.password = user.password;
	this.mobile = user.mobile;
	this.isDelete=user.isDelete;
};
User.queryUser = function (page, callback) {
	var selectSql = 'select * from user ';
	selectSql  += " LIMIT ?,?";
	db.query(selectSql, [(page.page - 1) * page.size,page.size], function (err, result) {
		if (err) {
			return callback(err);
		}
		var data=result;
		callback(err, data);
	});
};
User.queryUserMessage = function (id, callback) {
	var selectSql = 'select * from user where id=?';
	db.query(selectSql, [id], function (err, result) {
		if (err) {
			return callback(err);
		}
		var data=result[0];
		callback(err, data);
	});
};

User.updateUser= function (user, callback) {
	var selectSql = 'UPDATE user SET isDelete =? WHERE id=?';
	db.query(selectSql, [ parseInt(user.isDelete),user.id], function (err, result) {
		if (err) {
			return callback(err);
		}
		callback(err, result);
	});
};
User.countUser = function (callback) {
  var selectSql = 'SELECT count(id) as count FROM user ';
  db.query(selectSql, function (err, result) {
    if (err) {
      return callback(err);
    }
    var data = result[0];
    callback(err, data);
  });
};
User.getUserById = function (id, callback) {
	var selectSql = 'select * from user where id = ?';
	db.query(selectSql, [id], function (err, result) {
		if (err) {
			return callback(err);
		}
		var data=result[0];
		callback(err, data);
	});
};
User.getUserByName = function (username, callback) {
	var selectSql = 'select * from user where username = ?';
	db.query(selectSql, [username], function (err, result) {
		if (err) {
			return callback(err);
		}
		var data=result;
		callback(err, data);
	});
};
User.getUserByMobile = function (mobile, callback) {
	var selectSql = 'select * from user where mobile = ?';
	db.query(selectSql, [mobile], function (err, result) {
		if (err) {
			return callback(err);
		}
		var data=result;
		callback(err, data);
	});
};
User.addUser= function (user, callback) {
	var selectSql = 'insert into user (id,username,password,mobile,isDelete)  values (null,?,?,?,?)';
	db.query(selectSql, [user.username,user.password,user.mobile,user.isDelete], function (err, result) {
		if (err) {
			return callback(err);
		}
		callback(err, result);
	});
};
User.updatePassword= function (id,password, callback) {
	var selectSql = 'UPDATE user SET password =? WHERE id=?';
	db.query(selectSql, [password,id], function (err, result) {
		if (err) {
			return callback(err);
		}
		callback(err, result);
	});
};
module.exports = User;
