'use strict';
import MMUtil from 'util/mm.jsx';

const _mm = new MMUtil();
export default class Shop{
    Del(id){
        return _mm.request({
            url     : _mm.getServerUrl('/manage/shop/manage_delete_shop.do'),
            method  : 'POST',
            data    : {
                shopId : id
            }
        });
    }
    ShopBlacklist(j){
        return _mm.request({
            url     : _mm.getServerUrl('/manage/shop/manage_blacklist_shop.do'),
            method  : 'POST',
            data    : {
                shopId : j
            }
        });
    }
    Search(id){
        return _mm.request({
            url     : _mm.getServerUrl('/manage/shop/manage_search_shop.do'),
            method  : 'POST',
            data    : {
                shopId : id
            }
        });
    }
    ShopList(listParam){
    if(listParam.listType == 'list'){
        return _mm.request({
            url     : _mm.getServerUrl('/manage/shop/manage_list_shop.do'),
            method  : 'POST',
            data    : {
                pageNum : listParam.pageNum || 1
            }
        });
    }
    else if(listParam.listType == 'search'){
        return _mm.request({
            url     : _mm.getServerUrl('/manage/shop/manage_search_shop.do'),
            method  : 'POST',
            data    : {
                shopId : listParam.id
            }
        });
    }
    }
}
