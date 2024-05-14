const router = require("koa-router")();
const {
  changeList,
  addChanges,
  updateChanges,
  deleteChanges,
} = require("../controllers/mysqlControl.js");

router.get("/changeList", async (ctx) => {
  try {
    const result = await changeList();
    console.log(result);
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

router.post("/addChanges", async (ctx) => {
  let data = ctx.request.body;
  try {
    const result = await addChanges(data);
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

router.post("/updateChanges", async (ctx) => {
  let data = ctx.request.body;
  try {
    const result = await updateChanges(data);
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

router.post("/deleteChanges", async (ctx) => {
  let data = ctx.request.body;
  try {
    const result = await deleteChanges(data);
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
