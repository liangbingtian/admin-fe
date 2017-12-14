/*
* @Author: Rosen
* @Date:   2017-02-24 10:47:04
* @Last Modified by:   Rosen
* @Last Modified time: 2017-04-13 15:58:04
*/

'use strict';

const conf = {
    // online
    // serverHost: 'http://admin.happymmall.com'
    // dev
    serverHost: '',
    imageHost: 'http://img.xiaozi1931.com/',
}

class MMUtil{
    // 请求服务器
    request(param){
        return new Promise((resolve, reject) => {
            $.ajax({
                type       : param.method   || 'get',
                url        : param.url      || '',
                dataType   : param.type     || "json",
                data       : param.data     || null,
                success    : res => {
                    // 数据成功
                    if(0 === res.status){
                        typeof resolve === 'function' && resolve(res.data || res.msg);
                    }
                    // 没登录状态, 且强制登录, 自动跳转到登录页
                    else if(res.status === 10){
                        this.doLogin();
                    }
                    // 其他状态，调用error
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
    // 获取请求url地址
    getServerUrl(path){
        return conf.serverHost + path;
    }
    // 获取图片地址
    getImageUrl(path){
        return conf.imageHost + path;
    }
    // 获取url参数
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
        alert(msg || 'Where is wrong~');
    }
    // 向本地存储里放数据
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
            alert('该数据类型不能用于本地存储');
        }
    }
    // 从本地存储获取数据
    getStorage(name){
        let data = window.localStorage.getItem(name);
        if(data){
            // JSON.parse
            return JSON.parse(data);
        }else{
            return '';
        }
    }
    // 删除本地存储
    removeStorage(name){
        window.localStorage.removeItem(name);
    }
    // 跳转登录
    doLogin(){
        window.location.href = '#/login?redirect=' + encodeURIComponent(window.location.hash);
    }

    //深拷贝
    copy(obj1,obj2){
        var obj2=obj2||{}; //最初的时候给它一个初始值=它自己或者是一个json
        for(var name in obj1){
            if(typeof obj1[name] === "object"){ //先判断一下obj[name]是不是一个对象
                obj2[name]= (obj1[name].constructor===Array)?[]:{}; //我们让要复制的对象的name项=数组或者是json
                this.copy(obj1[name],obj2[name]); //然后来无限调用函数自己 递归思想
            }else{
                obj2[name]=obj1[name];  //如果不是对象，直接等于即可，不会发生引用。
            }
        }
        return obj2; //然后在把复制好的对象给return出去
    }
}
export default MMUtil;
