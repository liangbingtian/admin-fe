/*
* @Author: Rosen
* @Date:   2017-02-11 20:06:59
* @Last Modified by:   Rosen
* @Last Modified time: 2017-02-24 21:06:43
*/

'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss'
const PageTitle = React.createClass({
    componentDidMount(){
        document.title = this.props.pageTitle || 'PARKnSHOP ADMIN'
    },
    render() {
        return (
            <div className="row">
                <ul className="breadcrumb">
                    <li>
                        <i className="fa fa-home fa-fw"></i>
                        <a href="#"><h5>Home</h5></a>
                        <i className="icon-angle-right"></i>
                    </li>
                    <li><a href="#">{this.props.pageTitle}{this.props.children}</a></li>
                    <hr/>
                </ul>
            </div>
        );
    }
});

export default PageTitle;