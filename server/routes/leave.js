const router = require("koa-router")();
const {
  leaveList,
  addLeave,
  updateLeave,
  deleteLeave,
} = require("../controllers/mysqlControl.js");

router.get("/leave", async (ctx) => {
  try {
    const result = await leaveList();
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

router.post("/addLeave", async (ctx) => {
  let data = ctx.request.body;
  try {
    const result = await addLeave(data);
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

router.post("/updateLeave", async (ctx) => {
  let data = ctx.request.body;
  try {
    const result = await updateLeave(data);
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

router.post("/deleteLeave", async (ctx) => {
  let data = ctx.request.body;
  try {
    const result = await deleteLeave(data);
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
