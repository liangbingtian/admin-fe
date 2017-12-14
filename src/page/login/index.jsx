/*
* @Author: Jackhui
* @Date:   2017-12-02 12:39:33
*/

'use strict';
import React from 'react';
import ReactDOM from 'react-dom';

import MMUtile from 'util/mm.jsx';
import User from 'service/user.jsx';
import './index.scss'
const _mm    = new MMUtile();
const _user  = new User();

const Login = React.createClass({
    getInitialState() {
        return {
            username : '',
            password : '',
            redirect : _mm.getHashParam('redirect')
        };
    },
    // 点击登录
    onLogin(e){
        e.preventDefault();
        let loginInfo   = {
                username: this.state.username,
                password: this.state.password
            },
            checkLogin  = _user.checkLoginInfo(loginInfo);
        if(checkLogin.state){
            // 登录成功后进行跳转
            _user.login(loginInfo).then(res => {
                _mm.setStorage('userInfo', res);
                window.location.href = this.state.redirect || '#/home';
            }, errMsg => {
                _mm.errorTips(errMsg);
            });
        }else{
            _mm.errorTips(checkLogin.msg);
        }
    },
    // 输入框内容变化时，更新state中的字段
    onInputChange(e){
        let ele         = e.target,
            inputValue  = e.target.value,
            inputName   = e.target.name;
        this.setState({
            [inputName] : inputValue
        });
    },
    render() {
        return (
                    <div className="container">
                    <div className="col-md-6 col-md-offset-3 ">
                        <div className="login-panel panel panel-default">
                            <div className="panel-heading">
                                <p className="login-img"><i className="fa fa-lock fa-fw"></i></p>
                            </div>
                            <div className="panel-body">
                                <form role="form" onSubmit={this.onLogin}>
                                    <div className="form-group">
                                        <input className="form-control"
                                            placeholder="User Name"
                                            name="username"
                                            type="text"
                                            autoComplete="off"
                                            autoFocus
                                            onChange={this.onInputChange}/>
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control"
                                            placeholder="Password"
                                            name="password"
                                            type="password"
                                            onChange={this.onInputChange}/>
                                    </div>
                                    <button type="submit" className="btn btn-lg btn-primary btn-block">Login</button>
                                </form>
                        </div>
                    </div>
                    </div>
                </div>
        );
    }
});

export default Login;