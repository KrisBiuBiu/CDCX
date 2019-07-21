const Router = require("koa-router");
const homeRouter = new Router();
const fs = require("fs");
const imgModel = require("../../data/imgModel.js");
const newsModel = require("../../data/newsModel.js");
const homeModel = require("../../data/homeModel.js");
homeRouter
  .get("/", async (ctx, next) => {
    const imgArray = await imgModel.find({});
    let homeDemo = await homeModel.findOne({});
    if(!homeDemo) {
      homeDemo = new homeModel({type: "home"})
    }
    const post = {
      imgArray,
      homeDemo
    }
    await ctx.render('backstage/home',{
      post
    })
    await next();
  })
  .post("/", async (ctx, next) => {
    const data = ctx.request.body;
    var reqMap = {
      firstTitle : data.firstTitle,
      firstCnCon : data.firstCnCon,
      firstEnCon : data.firstEnCon,
      serEasyTitle : data.serEasyTitle,
      serNameOne : data.serNameOne,
      serTextOne : data.serTextOne,
      serNameTwo : data.serNameTwo,
      serTextTwo : data.serTextTwo,
      serNameThr : data.serNameThr,
      serTextThr : data.serTextThr,
      midLeftImg : data.midLeftImg,
      midRightTitle : data.midRightTitle,
      midRightConOne : data.midRightConOne,
      midRightConTwo : data.midRightConTwo,
      groTitle : data.groTitle,
      groImgArr : data.groImgArr,
      kehuTitle : data.kehuTitle,
      kehuImgArr : data.kehuImgArr,
    }
    let homeDemo = await homeModel.findOne({type: "home"});
    if(homeDemo) {
      await homeDemo.update({$set:reqMap})
    }else{
      homeDemo = new homeModel(reqMap);
      await homeDemo.save();
    }
    ctx.body = {success: false, msg: '发布成功'};
    await next();
  })
  .post("/del", async (ctx, next) => {
    const data = ctx.request.body;
    const id = data.id;
    await newsModel.deleteOne({_id: id})
    ctx.body = {success: false, msg: '删除成功'};
    await next();
  })
module.exports = homeRouter;