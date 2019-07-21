const Router = require('koa-router');
const router = new Router();
const newsModel = require("../../data/newsModel.js");
router
  .use("/", async (ctx, next) => {
    console.log("汽车运动");
    await next();
  })
  .get("/", async (ctx, next) => {
    const newsArray = await newsModel.find({});
    const post = {
      newsArray,
    }
    await ctx.render('carsport/carschool', {
      post,
    })
    await next();
  })
  .get("/day", async (ctx, next) => {
    const newsArray = await newsModel.find({});
    const post = {
      newsArray,
    }
    await ctx.render('carsport/day', {
      post,
    })
    await next();
  });
module.exports = router;
