const router = require("koa-router")();
const { product } = require("../controllers/mysqlControl.js");

router.post("/login", (ctx) => {
  let user = ctx.request.body; // 获取到前端川传过来的参数
  console.log(user);
  if (1) {
    ctx.body = {
      code: 200,
      msg: "登录成功",
    };
  }
});
router.get("/home", (ctx) => {
  ctx.body = {
    code: 200,
    msg: "首页",
  };
});

router.get("/product", async (ctx) => {
  try {
    const result = await product();
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

module.exports = router;
