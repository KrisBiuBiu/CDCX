const Router = require('koa-router');
const router = new Router();
const newsModel = require("../../data/newsModel.js");
router
  .use("/", async (ctx, next) => {
    await next();
  })
  .get("/", async (ctx, next) => {
    const newsArray = await newsModel.find({});
    const post = {
      newsArray
    }
    await ctx.render('news', {
      post,
    })
    await next();
  })
  .get("/:nid", async (ctx, next) => {
    const nid = ctx.params.nid;
    const newsContent = await newsModel.findOne({_id: nid});
    const newsArray = await newsModel.find({});
    const post = {
      newsContent,
      newsArray
    }
    await ctx.render('newsContent', {
      post,
    })
    await next();
  })
module.exports = router;
