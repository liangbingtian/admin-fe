/*
* @Author: Rosen
* @Date:   2017-02-24 15:49:17
* @Last Modified by:   Rosen
* @Last Modified time: 2017-04-13 15:59:59
*/

'use strict';

import MMUtil from 'util/mm.jsx';

const mm = new MMUtil();

export default class User{
    // Check if the information used for login is legal
    checkLoginInfo(userInfo){
        if(!userInfo.username){
            return {
                state: false,
                msg: 'Username can not be empty'
            }
        }
        if(!userInfo.password){
            return {
                state: false,
                msg: 'Password can not be empty'
            }
        }
        return {
            state: true,
            msg: 'Verification passed'
        }
    }
    // login
    login(userInfo){
        return mm.request({
            url     : mm.getServerUrl('/manage/user/manage_login.do'),
            method  : 'POST',
            data    : {
                username : userInfo.username || '',
                password : userInfo.password || ''
            }
        });
    }
    // logout
    logout(){
        return mm.request({
            url     : mm.getServerUrl('/user/logout.do'),
            method  : 'POST',
        });
    }
}
