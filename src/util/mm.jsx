/*
* @Author: Jackhui
* @Date:   2017-12-02 10:47:04
*/

'use strict';

const conf = {
    // online
    // serverHost: 'http://admin.happymmall.com'
    // dev
    serverHost: '',
    imageHost: 'http://img.happymmall.com/',
}

class MMUtil{
    // Request Server
    request(param){
        return new Promise((resolve, reject) => {
            $.ajax({
                type       : param.method   || 'get',
                url        : param.url      || '',
                dataType   : param.type     || "json",
                data       : param.data     || null,
                success    : res => {
                    // Data Success
                    if(0 === res.status){
                        typeof resolve === 'function' && resolve(res.data || res.msg);
                    }
                    // if no login status,jump to the login page automatically
                    else if(res.status === 10){
                        this.doLogin();
                    }
                    // other status, return error
                    else{
                        typeof reject === 'function' && reject(res.msg || res.data);
                    }
                },
                error: err => {
                    typeof reject === 'function' && reject(err.statusText);
                }
            });
        });
    }
    // Get URL address
    getServerUrl(path){
        return conf.serverHost + path;
    }
    // Get Image Url address
    getImageUrl(path){
        return conf.imageHost + path;
    }
    // Get Url Options
    getHashParam(name){
        var reg         = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
            queryString = window.location.hash.split('?')[1] || '',
            result      = queryString.match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    }
    // alert
    successTips(msg){
        alert(msg || 'Successful operation');
    }
    // alert
    errorTips(msg){
        alert(msg || 'Something wrong with it~');
    }
    // Put data into local storage
    setStorage(name, data){
        // array / json
        if(typeof data === 'object'){
            let jsonString = JSON.stringify(data);
            window.localStorage.setItem(name, jsonString);
        }
        // number / string / boolean
        else if(typeof data === 'number' || typeof data === 'string' || typeof data === 'boolean'){
            window.localStorage.setItem(name, jsonString);
        }
        // undefined / function
        else{
            alert('This data type can not be used for local storage');
        }
    }
    // Get data from local storage
    getStorage(name){
        let data = window.localStorage.getItem(name);
        if(data){
            // JSON.parse
            return JSON.parse(data);
        }else{
            return '';
        }
    }
    // Delete local storage
    removeStorage(name){
        window.localStorage.removeItem(name);
    }
    // Jump login
    doLogin(){
        window.location.href = '#/login?redirect=' + encodeURIComponent(window.location.hash);
    }
}
export default MMUtil;