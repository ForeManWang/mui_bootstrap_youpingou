'use strict';

const mysql = require('mysql');

const pool  = mysql.createPool({
    host : '127.0.0.1',
    user : 'root',
    password : 'Wqp516#',
    database : 'letao'
});

/**
 * [query description]
 * @return {[type]} [description]
 */
// 如果用户传递了两个参数，那么第一个就是 SQL 操作字符串， 第二个就是回调函数
// 如果是三个参数：第一个SQL字符串，第二个数组，第三个参数回调函数
exports.query = function() {
    let args = arguments;

    let sqlStr = args[0];
    let params = [];
    let callback;

    if (args.length === 2 && typeof args[1] === 'function') {
        callback = args[1];
    } else if (args.length === 3 && Array.isArray(args[1]) && typeof args[2] === 'function') {
        params = args[1];
        callback = args[2];
    } else {
        throw new Error('参数个数不匹配');
    }

    pool.getConnection(function(err, connection) {
        if (err) {
            callback(err);
        }
        connection.query(sqlStr, params, function(err, rows) {
            if (err) {
                callback(err);
            }
            connection.release();
            callback.apply(null, arguments);
        });
    });
};


