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

const _mm       = new MMUtile();
const _user     = new User();

const TopNav = React.createClass({
    getInitialState() {
        return {
            userName : ''
        };
    },
    componentDidMount(){
        let userInfo = _mm.getStorage('userInfo');
        if(userInfo){
            this.setState({
                userName : userInfo.username || ''
            });
        }
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
                    <a className="navbar-brand" href="#/">BaiJia ADMIN</a>
                </div>
                <ul className="nav navbar-top-links navbar-right">
                    <li>
                        <a className="btn-apply" onClick={this.onMessage}>Message</a>

                    </li>
                    <li className="dropDown">
                        {
                            this.state.userName ?
                            <span>Welcome，{this.state.userName}</span>
                                : <a className="btn-login" onClick={this.onLogin}>LOGIN</a>
                        }
                    </li>
                    <li className="dropDown">
                        {
                            this.state.userName ?
                            <a className="btn-lo gout" onClick={this.onLogout}>EXIT</a>
                                : <div></div>
                        }
                    </li>
                </ul>
            </div>
        );
    }
});

export default TopNav;
