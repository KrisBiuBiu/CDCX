const Router = require('koa-router');
const router = new Router();
const newsModel = require("../../data/newsModel.js");
const dayModel = require("../../data/dayModel.js");
const homeModel = require("../../data/homeModel.js");
router
  .use("/", async(ctx, next) => {
    console.log("首页")
    await next();
  })
  .get("/", async(ctx, next) => {
    let nowYear = new Date().getFullYear();
    let nextYear = nowYear + 1;
    let nowYearStamp = new Date(`${nowYear}-1-1`).getTime();
    let nextYearStamp = new Date(`${nextYear}-1-1`).getTime();
    let oneDayStamp = 60*60*24*1000;
    const newsArray = await newsModel.find({});
    const dayArray = await dayModel.find({});
    let homeDemo = await homeModel.findOne({type:"home"});
    if(!homeDemo) {
      homeDemo = new homeModel({type: "home"})
    }
    const post = {
      newsArray,
      dayArray,
      nowYearStamp,
      nextYearStamp,
      homeDemo
    }
    await ctx.render('index', {
      post,
    })
    console.log(ctx)
    await next();
  });
module.exports = router;
