const router = require("koa-router")();
const {
  repairList,
  addRepair,
  updateRepair,
  deleteRepair,
} = require("../controllers/mysqlControl.js");

router.get("/repairList", async (ctx) => {
  try {
    const result = await repairList();
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

router.post("/addRepair", async (ctx) => {
  let data = ctx.request.body;
  try {
    const result = await addRepair(data);
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
router.post("/updateRepair", async (ctx) => {
  let data = ctx.request.body;
  try {
    const result = await updateRepair(data);
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

router.post("/deleteRepair", async (ctx) => {
  let data = ctx.request.body;
  try {
    const result = await deleteRepair(data);
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
