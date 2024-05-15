const router = require("koa-router")();
const {
  employeeList,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/mysqlControl.js");

router.get("/employee", async (ctx) => {
  try {
    const result = await employeeList();
    if (result) {
      ctx.body = {
        code: "200",
        data: result,
      };
    } else {
      ctx.body = {
        code: "8005",
        data: null,
        msg: "获取失败",
      };
    }
  } catch (err) {
    ctx.body = {
      code: "8005",
      data: err,
      msg: "服务器异常",
    };
  }
});

router.post("/addEmployee", async (ctx) => {
  let data = ctx.request.body;
  try {
    const result = await addEmployee(data);
    if (result) {
      ctx.body = {
        code: "200",
        data: result,
      };
    } else {
      ctx.body = {
        code: "8005",
        data: null,
        msg: "添加失败",
      };
    }
  } catch (err) {
    ctx.body = {
      code: "8005",
      data: err,
      msg: "服务器异常",
    };
  }
});

router.post("/updateEmployee", async (ctx) => {
  let data = ctx.request.body;
  try {
    const result = await updateEmployee(data);
    if (result) {
      ctx.body = {
        code: "200",
        data: result,
      };
    } else {
      ctx.body = {
        code: "8005",
        data: null,
        msg: "添加失败",
      };
    }
  } catch (err) {
    ctx.body = {
      code: "8005",
      data: err,
      msg: "服务器异常",
    };
  }
});

router.post("/deleteEmployee", async (ctx) => {
  let data = ctx.request.body;
  try {
    const result = await deleteEmployee(data);
    if (result) {
      ctx.body = {
        code: "200",
        data: result,
      };
    } else {
      ctx.body = {
        code: "8005",
        data: null,
        msg: "删除失败",
      };
    }
  } catch (err) {
    ctx.body = {
      code: "8005",
      data: err,
      msg: "服务器异常",
    };
  }
});

module.exports = router;
