var db = require('./db.js');


function Employee(employee) {
	this.id=employee.id;
	this.username = employee.username;
	this.password = employee.password;
	this.mobile = employee.mobile;
	this.authority=employee.authority;
};
Employee.getUserByName = function (username, callback) {
	var selectSql = 'select * from employee where username = ?';
	db.query(selectSql, [username], function (err, result) {
		if (err) {
			return callback(err);
		}
		var data=result[0];
		callback(err, data);
	});
};
module.exports = Employee;
