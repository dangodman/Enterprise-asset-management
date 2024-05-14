const router = require("koa-router")();
const {
  acquisitionList,
  addAcquisition,
  updateAcquisition,
  deleteAcquisition,
} = require("../controllers/mysqlControl.js");

router.get("/acquisitionList", async (ctx) => {
  try {
    const result = await acquisitionList();
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

router.post("/addAcquisition", async (ctx) => {
  let data = ctx.request.body;
  try {
    const result = await addAcquisition(data);
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

router.post("/updateAcquisition", async (ctx) => {
  let data = ctx.request.body;
  try {
    const result = await updateAcquisition(data);
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

router.post("/deleteAcquisition", async (ctx) => {
  let data = ctx.request.body;
  try {
    const result = await deleteAcquisition(data);
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
