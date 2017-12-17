/*
* @Author: Rosen
* @Date:   2017-04-05 11:07:34
* @Last Modified by:   Rosen
* @Last Modified time: 2017-04-05 17:47:33
*/

'use strict';

import MMUtil from 'util/mm.jsx';

const _mm = new MMUtil();

export default class Order{
    // 获取订单列表
    getOrderList(listParam){

            return _mm.request({
                url     : _mm.getServerUrl('/manage/order/list.do'),
                data    : {
                    pageNum  : listParam.pageNum || 1,
                    time_type: listParam.timetype|| 'day'
                }
            });
        }

    // 获取订单详情
    getOrderDetail(orderNo){
        return _mm.request({
            url     : _mm.getServerUrl('/manage/order/search.do'),
            data    : {
                orderNo : orderNo || 0
            }
        });
    }

}