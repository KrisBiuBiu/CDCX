const Router = require('koa-router');
const newsModel = require("../../data/newsModel.js");
const serviceModel = require("../../data/serviceModel.js");
const imgModel = require("../../data/imgModel.js")
const router = new Router();
router
  .use("/", async (ctx, next) => {
    await next();
  })
  .get("/", async (ctx, next) => {
    const r = await serviceModel.findOne({type: "r"});
    const newsArray = await newsModel.find({});
    const post = {
      newsArray,
      r
    }
    await ctx.render('service', {
      post,
    })
    await next();
  })
  .get("/a", async(ctx, next) => {
    const a = await serviceModel.findOne({type: "a"});
    const imgArray = await imgModel.find({});
    const newsArray = await newsModel.find({});
    const post = {
      newsArray,
      a,
      imgArray
    }
    await ctx.render('servicea', {
      post
    })
    await next();
  })
  .get("/c", async(ctx, next) => {
    const c = await serviceModel.findOne({type: "c"});
    const imgArray = await imgModel.find({});
    const newsArray = await newsModel.find({});
    const post = {
      newsArray,
      c,
      imgArray
    }
    await ctx.render('servicec', {
      post
    })
    await next();
  })
  .get("/r", async(ctx, next) => {
    const r = await serviceModel.findOne({type: "r"});
    const imgArray = await imgModel.find({});
    const newsArray = await newsModel.find({});
    const post = {
      newsArray,
      r,
      imgArray
    }
    await ctx.render('servicer', {
      post
    })
    await next();
  })
module.exports = router;
