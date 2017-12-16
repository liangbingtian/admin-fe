/*
* @Author: Rosen
* @Date:   2017-02-11 19:49:01
* @Last Modified by:   Rosen
* @Last Modified time: 2017-04-13 16:05:51
*/

'use strict';
import React    from 'react';
import ReactDOM from 'react-dom';

import MMUtile  from 'util/mm.jsx';
import User     from 'service/user.jsx';
import Customer from 'service/customer.jsx';

import './index.scss';
const _mm       = new MMUtile();
const _user     = new User();
const _customer = new Customer();
const TopNav = React.createClass({
    getInitialState() {
        return {
            userName : '',
            list: []
        };
    },
    componentDidMount(){
        let userInfo = _mm.getStorage('userInfo');
        if(userInfo){
            this.setState({
                userName : userInfo.username || ''
            });
        }
        _customer.getMessage().then((res) => {
            console.log(res);
        }, err => {
            console.log(err.msg);
        })
    },
    // keyword change
    onKeywordChange(e){
        let keyword = e.target.value.trim();
        this.setState({
            searchKeyword : keyword
        });
    },
    onLogout(){
        _user.logout().then(res => {
            window.location.href = '#/login';
        }, errMsg => {
            _mm.errorTips(errMsg);
        });
    },
    onLogin() {
        window.location.href = '#/login'
    },
    onMessage(){
        window.location.href = '#/message';
    },
    render() {
        return (
            <div>
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" href="#/">
                        <img src="./../../../parknshopadmin.jpg" alt="PARKnSHOP ADMIN"/>
                    </a>
                </div>
                <ul className="nav navbar-top-links navbar-right">
                    <li>
                        <a className="btn glyphicon glyphicon-envelope" onClick={this.onMessage}></a>
                            <span className="badge red">
                                {this.state.list.length}</span>
                    </li>
                    <li>
                        {
                            this.state.userName ?
                            <span>Welcome，{this.state.userName}</span>
                                : <a className="btn-login" onClick={this.onLogin}><b>Login</b></a>
                        }
                    </li>
                    {/*<li className="dropDown">*/}

                        {/*{*/}
                            {/*this.state.userName ?*/}
                            {/*<a className="btn-logout" onClick={this.onLogout}>EXIT</a>*/}
                                {/*: <div></div>*/}
                        {/*}*/}
                    {/*</li>*/}
                    { this.state.userName ?
                    <li className="dropdown">
                        <a type="button" className="btn dropdown-toggle" data-toggle="dropdown">
                            <i className="glyphicon glyphicon-user"></i>
                            <b>jackhui</b>
                            <span className="caret"></span>
                        </a>
                        <ul className="dropdown-menu">
                            <li className="dropdown-menu-title" role="presentation">
                                <a onClick={this.onLogout}>
                                    <i className="glyphicon glyphicon-off"></i> <b>Logout</b>
                                    </a>
                            </li>
                        </ul>
                    </li>  : <div></div>
                    }
                </ul>
            </div>
        );
    }
});

export default TopNav;
