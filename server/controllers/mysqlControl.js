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
};

// 通过id删除维修信息
const deleteRepair = (params) => {
  let _sql = `delete from maintenanceInformation where id=${params.id}`;
  return allService.query(_sql);
};

// 获取所有的领用信息
const acquisitionList = () => {
  let _sql = `select * from acquisition`;
  return allService.query(_sql);
};

// 添加一个领用信息
const addAcquisition = (params) => {
  let _sql = `insert into acquisition(state, orderNumber, date, people, processor, remark) values('${params.state}','${params.orderNumber}','${params.date}','${params.people}','${params.processor}','${params.remark}')`;
  return allService.query(_sql);
};
// 通过id修改领用信息
const updateAcquisition = (params) => {
  let _sql = `update acquisition set state='${params.state}',orderNumber='${params.orderNumber}',date='${params.date}',people='${params.people}',processor='${params.processor}',remark='${params.remark}' where id=${params.id}`;
  return allService.query(_sql);
};
// 通过id删除一个领用信息
const deleteAcquisition = (params) => {
  let _sql = `delete from acquisition where id=${params.id}`;
  return allService.query(_sql);
};

// 获取所有实物信息变更
const changeList = () => {
  let _sql = `select * from changes`;
  return allService.query(_sql);
};

// 添加一个实物信息信息
const addChanges = (params) => {
  let _sql = `insert into changes(state, orderNumber, date, processor,people,name, remark) values('${params.state}','${params.orderNumber}','${params.date}','${params.processor}','${params.people}','${params.name}','${params.remark}')`;
  return allService.query(_sql);
};
// 通过id修改实物信息
const updateChanges = (params) => {
  let _sql = `update changes set state='${params.state}',orderNumber='${params.orderNumber}',date='${params.date}',processor='${params.processor}',people='${params.people}',name='${params.name}',remark='${params.remark}' where id=${params.id}`;
  return allService.query(_sql);
};
// 通过id删除一个领用信息
const deleteChanges = (params) => {
  let _sql = `delete from changes where id=${params.id}`;
  return allService.query(_sql);
};

// 获取所有员工信息
const employeeList = () => {
  let _sql = `select * from employee`;
  return allService.query(_sql);
};
// 添加一个员工信息
const addEmployee = (params) => {
  let _sql = `insert into employee(name, sex, age, phone, department, position, salary) values('${params.name}','${params.sex}','${params.age}','${params.phone}','${params.department}','${params.position}','${params.salary}')`;
  return allService.query(_sql);
};
// 通过id修改员工信息
const updateEmployee = (params) => {
  let _sql = `update employee set name='${params.name}',sex='${params.sex}',age='${params.age}',phone='${params.phone}',department='${params.department}',position='${params.position}',salary='${params.salary}' where id=${params.id}`;
  return allService.query(_sql);
};
// 通过id删除一个员工信息
const deleteEmployee = (params) => {
  let _sql = `delete from employee where id=${params.id}`;
  return allService.query(_sql);
};
// 获取所有离职信息
const leaveList = () => {
  let _sql = `select * from leaves`;
  return allService.query(_sql);
};
// 添加一个离职信息
const addLeave = (params) => {
  let _sql = `insert into leaves(name, sex, age, phone, department, position, reason) values('${params.name}','${params.sex}','${params.age}','${params.phone}','${params.department}','${params.position}','${params.reason}')`;
  return allService.query(_sql);
}
// 通过id修改离职信息
const updateLeave = (params) => {
  let _sql = `update leaves set name='${params.name}',sex='${params.sex}',age='${params.age}',phone='${params.phone}',department='${params.department}',position='${params.position}',reason='${params.reason}' where id=${params.id}`;
  return allService.query(_sql);
};
// 通过id删除一个离职信息
const deleteLeave = (params) => {
  let _sql = `delete from leaves where id=${params.id}`;
  return allService.query(_sql);
};

module.exports = {
  product,
  fixedList,
  repairList,
  addRepair,
  updateRepair,
  deleteRepair,
  acquisitionList,
  addAcquisition,
  updateAcquisition,
  deleteAcquisition,
  changeList,
  addChanges,
  updateChanges,
  deleteChanges,
  employeeList,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  leaveList,
  addLeave,
  updateLeave,
  deleteLeave,
};
