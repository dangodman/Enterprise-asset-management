const mysql = require("mysql2");
const config = require("../config");

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
};

// 获取所有维修信息
const repairList = () => {
  let _sql = `select * from maintenanceInformation`;
  return allService.query(_sql);
};

// 添加一个维修信息
const addRepair = (params) => {
  let _sql = `insert into maintenanceInformation(state, orderNumber, date, processor, repair, spend, remark) values('${params.state}','${params.orderNumber}','${params.date}','${params.processor}','${params.repair}','${params.spend}','${params.remark}')`;
  return allService.query(_sql);
};

// 通过id修改维修信息
const updateRepair = (params) => {
  let _sql = `update maintenanceInformation set state='${params.state}', orderNumber='${params.orderNumber}', date='${params.date}', processor='${params.processor}', repair='${params.repair}', spend='${params.spend}', remark='${params.remark}' where id=${params.id}`;
  return allService.query(_sql);
}

// 通过id删除维修信息
const deleteRepair = (params) => {
  let _sql = `delete from maintenanceInformation where id=${params.id}`;
  return allService.query(_sql);
};

module.exports = {
  product,
  fixedList,
  repairList,
  addRepair,
  updateRepair,
  deleteRepair,
};
