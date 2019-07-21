const Router = require('koa-router');
const router = new Router();
const newsModel = require("../../data/newsModel.js");
const eventModel = require("../../data/eventModel.js")
router
  .use("/", async (ctx, next) => {
    await next();
  })
  .get("/", async (ctx, next) => {
    const newsArray = await newsModel.find({});
    const post = {
      newsArray
    }
    await ctx.render('event/index', {
      post,
    })
    await next();
  })
  .get("/zlq", async (ctx, next) => {
    const eventContent = await eventModel.findOne({type: "zlq"});
    const newsArray = await newsModel.find({});
    const post = {
      newsArray,
      eventContent,
    }
    await ctx.render('event/index', {
      post,
    })
    await next();
  })
  .get("/crc", async (ctx, next) => {
    const eventContent = await eventModel.findOne({type: "crc"});
    const newsArray = await newsModel.find({});
    const post = {
      newsArray,
      eventContent,
    }
    await ctx.render('event/index', {
      post,
    })
    await next();
  });
module.exports = router;
