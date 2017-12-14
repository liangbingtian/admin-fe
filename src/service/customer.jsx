/*
* @Author: Rosen
* @Date:   2017-02-24 10:35:19
* @Last Modified by:   Rosen
* @Last Modified time: 2017-04-09 23:43:37
*/

'use strict';
import MMUtil from 'util/mm.jsx';

const _mm = new MMUtil();

export default class Product{

    getCustomerList(listParam){
        if(listParam.listType == 'list'){
            return _mm.request({
                url     : _mm.getServerUrl('/manage/user/manager_list_user.do'),
                method  : 'POST',
                data    : {
                    pageNum : listParam.pageNum || 1
                }
            });
        }
        else if(listParam.listType == 'search'){
            return _mm.request({
                url     : _mm.getServerUrl('/manage/user/manage_user_search.do'),
                method  : 'POST',
                data    : {
                    username : listParam.username
                }
            });
        }

    }
    // set customer into blacklist
    setCustomerBlacklist(username){
        return _mm.request({
            url     : _mm.getServerUrl('/manage/user/manager_blacklist_user.do'),
            method  : 'POST',
            data    : {
                username  : username
            }
        });
    }
    // delete customer
    deleteCustomer(username){
        return _mm.request({
            url     : _mm.getServerUrl('/manage/user/manager_delete_user.do'),
            method  : 'POST',
            data    : {
                username : username
            }
        });
    }
    // get request about shop
    getMessage(listParam){
        return _mm.request({
            url     : _mm.getServerUrl('/manage/shopOwner/manage_search_applying.do'),
            method  : 'POST',
            data    : {
                pageNum :  1
            }
        });
    }
    // choice the shop request
    Messageapply(idvalue){
        return _mm.request({
            url     : _mm.getServerUrl('/manage/shopOwner/manage_change_role.do'),
            method  : 'POST',
            data    : {
                username    : idvalue.name,
                status   : idvalue.value
            }
        })
    }
}
