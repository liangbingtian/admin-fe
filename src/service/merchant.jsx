/*
* @Author: Jackhui
* @Date:   2017-12-03 10:35:19
*/

'use strict';
import MMUtil from 'util/mm.jsx';

const _mm = new MMUtil();

export default class Product{

    // get metchant list
    getMerchantList(listParam){
        if(listParam.listType == 'list'){
            return _mm.request({
                url     : _mm.getServerUrl('/manage/shopOwner/manage_list_shopOwner.do'),
                method  : 'POST',
                data    : {
                    pageNum : listParam.pageNum || 1
                }
            });
        }
        else if(listParam.listType == 'search'){
            return _mm.request({
                url     : _mm.getServerUrl('/manage/shopOwner/manage_search_shopOwner.do'),
                method  : 'POST',
                data    : {
                    userId : listParam.userId
                }
            });
        }

    }
    // set merchant into blacklist
    setMerchantBlacklist(username){
        return _mm.request({
            url     : _mm.getServerUrl('/manage/shopOwner/manage_blacklist_shopOwner.do'),
            method  : 'POST',
            data    : {
                username : username
            }
        });
    }
    // delete merchant
    deleteMerchant(id){
        return _mm.request({
            url     : _mm.getServerUrl('/manage/shopOwner/manage_delete_shopOwner.do'),
            method  : 'POST',
            data    : {
                userId : id
            }
        });
    }

}
