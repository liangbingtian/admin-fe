var koa = require('koa');
var app = new koa();
var koa_router = require('koa-router');
var router = new koa_router();

/*import koa from 'koa';
import koa_router from 'koa-router';

var app = koa(),
    router = koa_router();*/

//获取广告列表
var advertListData = require('./advert/list.js')
router.get('/seller/advert/list.do',function *(next) {
        this.body = advertListData;
});

//删除、添加广告
router.get('/seller/advert/save.do',function *(next) {
    const params = this.query.id;
    console.log('成功'+params+'位置'+this.query.location)

    let res = {
        "status": 0,
        "msg": "新增广告成功"
    }
    this.body = res;
    console.log(this.body.msg);
})

//获取商家的所有商品
var productData = require('./product/unAdvertProduct.js')
router.get('/seller/product/list.do',function *(next) {
    this.body = productData;
})



// 开始服务并生成路由
app.use(router.routes()).use(router.allowedMethods());
app.listen(3002);

console.log('------模拟数据服务启动成功------');
