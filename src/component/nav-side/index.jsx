/*
* @Author: JackHui
* @Date:   2017-12-1 18:49:48
*/

'use strict';
import React from 'react';
import ReactDOM from 'react-dom';

import { Link, IndexLink } from 'react-router';
import './index.scss';
const SideNav = React.createClass({
    getInitialState() {
        return {
            
        };
    },
    componentDidMount(){

    },
    render() {
        return (
            // Main menu
            <div className="navbar-default sidebar" role="navigation">
                <div className="sidebar-nav navbar-collapse">
                    <ul className="nav" id="side-menu">
                        <li>
                            <IndexLink to="/home" activeClassName="active">
                                <i className="fa fa-home fa-fw"></i>
                                <span>Home</span>
                            </IndexLink>
                        </li>
                        <li>
                            <Link>
                                <i className="fa fa-user fa-fw"></i>
                                <span>Customer</span>
                            </Link>
                            <ul className="nav nav-second-level collapse in">
                                <li>
                                    <Link to="/customer" activeClassName="active">Customer Management</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link>
                                <i className="fa fa-shopping-bag fa-fw"></i>
                                <span>Shop</span>
                            </Link>
                            <ul className="nav nav-second-level collapse in">
                                <li>
                                    <Link to="/shop" activeClassName="active">Shop Management</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link>
                                <i className="fa fa-money fa-fw"></i>
                                <span>Merchant</span>
                            </Link>
                            <ul className="nav nav-second-level collapse in">
                                <li>
                                    <Link to="/merchant" activeClassName="active">Merchant Management</Link>
                                </li>
                            </ul>
                        </li>
                       <li>
                            <Link>
                                <i className="fa fa-th-list fa-fw"></i>
                                <span>Order</span>
                            </Link>
                            <ul className="nav nav-second-level collapse in">
                                <li>
                                    <Link to="/order/history" activeClassName="active">Sale History</Link>
                                </li>
                                <li>
                                    <Link to="/order/detail/:orderNumber" activeClassName="active">Searching Order</Link>
                                </li>
                            </ul>
                        </li>
                        {/*<li>*/}
                            {/*<Link>*/}
                                {/*<i className="fa fa-film fa-fw"></i>*/}
                                {/*<span>Advertisement</span>*/}
                            {/*</Link>*/}
                            {/*<ul className="nav nav-second-level collapse in">*/}
                                {/*<li>*/}
                                    {/*<Link to="/ad" activeClassName="active">Management</Link>*/}
                                {/*</li>*/}
                            {/*</ul>*/}
                        {/*</li> */}

                    </ul>
                </div>
            </div>
        );
    }
});

export default SideNav;