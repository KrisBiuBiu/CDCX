const Router = require('koa-router');
const config = require("../../config");
const router = new Router();
router
  .use("/", async (ctx, next) => {
    console.log("登陆");
    await next();
  })
  .get("/", async (ctx, next) => {
    let title = "登陆"
    await ctx.render('backstage/login/index', {
      title,
    })
    await next();
  })
  .post("/", async (ctx, next) => {
    const data = ctx.request.body;
    const {userpass} = config;
    if(data.username !== userpass.username) {
      ctx.body = {success: false, msg: '用户名验证失败'};
    }else if(data.password !== userpass.password) {
      ctx.body = {success: false, msg: '密码验证失败'};
    }else{
      ctx.session.user = data.username;
      ctx.body = {success: true, msg: '登陆成功'};
    }
    await next();
  })
module.exports = router;
