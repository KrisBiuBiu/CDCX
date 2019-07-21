const Router = require("koa-router");
const dayRouter = new Router();
const dayModel = require("../../data/dayModel.js");
dayRouter
  .get("/", async (ctx, next) => {
    // 获取一月份的日子数
    let year = new Date().getFullYear();
    let month = "1";
    let dayCounts = new Date(year, month, 0).getDate();
    const dayArray = await dayModel.find({});
    const post = {
      dayArray,
      year,
      month,
      dayCounts
    }
    await ctx.render('backstage/day',{
      post
    })
    await next();
  })
  .get("/:month", async (ctx, next) => {
    // 获取一月份的日子数
    let year = new Date().getFullYear();
    let month = ctx.params.month;
    let dayCounts = new Date(year, month, 0).getDate();
    const dayArray = await dayModel.find({});
    const post = {
      dayArray,
      year,
      month,
      dayCounts
    }
    await ctx.render('backstage/day',{
      post
    })
    await next();
  })
  .post("/", async (ctx, next) => {
    const data = ctx.request.body;
    for(let i in data.dayArray) {
      let dayDoc = await dayModel.findOne({date: data.dayArray[i].date});
      if(dayDoc) {
        await dayModel.updateOne({date: data.dayArray[i].date}, {content: data.dayArray[i].content})
      }else{
        dayDoc = new dayModel({
          date: data.dayArray[i].date,
          content: data.dayArray[i].content
        });
        await dayDoc.save();
      }
    }
    ctx.body = {success: false, msg: '保存成功'};
    await next();
  })
  .post("/del", async (ctx, next) => {
    const data = ctx.request.body;
    const id = data.id;
    await dayModel.deleteOne({_id: id})
    ctx.body = {success: false, msg: '删除成功'};
    await next();
  })
module.exports = dayRouter;