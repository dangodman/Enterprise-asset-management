const mysql = require('mysql2')
const config = require('../config')

// 创建线程池
const pool = mysql.createPool({
  host: config.database.HOST,
  user: config.database.USER,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
  port: config.database.PORT,
});


const allService = {
  query: function (sql, values) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          reject(err);
        } else {
          connection.query(sql, values, (err, rows) => {
            if (err) {
              reject(err);
            } else {
              connection.release(); // 释放连接
              resolve(rows);
            }
          });
        }
      });
    });
  },
};

const product = () => {
  let _sql = `select * from products`;
  return allService.query(_sql);
};

const fixedList = () => {
  let _sql = `select * from fixed`;
  return allService.query(_sql);
}


module.exports = {
  product,
  fixedList
}

