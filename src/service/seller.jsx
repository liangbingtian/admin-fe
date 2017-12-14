'use strict';

import MMUtil from 'util/mm.jsx';

const _mm = new MMUtil();

export default class Seller{
    //获取广告列表
    getAdvertList(){
        return _mm.request({
            url       : _mm.getServerUrl('/seller/advert/list.do')
        })
    }
    //删除广告
    deleteAdvert(id){
        return _mm.request({
            url       : _mm.getServerUrl('/seller/advert/save.do'),
            data      : {
                id          :   id,
                location    :   -1,
            }
        })
    }

    //获取店家商品列表
    getProductList(){
        return  _mm.request({
            url       : _mm.getServerUrl('/seller/product/list.do'),
        })
    }

    //保存广告
    saveAdvert(advert){
        return _mm.request({
            url     :   _mm.getServerUrl('/seller/advert/save.do'),
            data    :   advert
        });
    }
}