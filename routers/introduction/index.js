const Router = require('koa-router');
const router = new Router();
router
  .use("/", async (ctx, next) => {
    console.log("赛道介绍");
    await next();
  })
  // 介绍首页
  .get("/", async (ctx, next) => {
    let title = "赛场介绍"
    await ctx.render('introduction/index', {
      title,
    })
    await next();
  })
  // 赛道介绍
  .get("/track", async (ctx, next) => {
    let title = "赛场介绍"
    await ctx.render('introduction/track', {
      title,
    })
    await next();
  })
  // 娱乐介绍
  .get("/joy", async (ctx, next) => {
    let title = "娱乐介绍"
    await ctx.render('introduction/joy', {
      title,
    })
    await next();
  })
  // 交通位置
  .get("/traffic", async (ctx, next) => {
    let title = "交通位置"
    await ctx.render('introduction/traffic', {
      title,
    })
    await next();
  });
module.exports = router;
