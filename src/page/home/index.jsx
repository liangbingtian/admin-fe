/*
* @Author: Rosen
* @Date:   2016-11-06 12:39:33
* @Last Modified by:   Rosen
* @Last Modified time: 2017-02-15 21:14:25
*/
'use strict';
import React        from 'react';
import ReactDOM     from 'react-dom';

import PageTitle    from 'component/page-title/index.jsx';

const Home = React.createClass({
    getInitialState() {
        return {
            hello: 'Welcome'
        };
    },
    componentDidMount: function(){
       console.log('Home did mount');
    },
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle pageTitle="Home"/>
                <div className="row-fluid">
                    <div className="span3 statbox purple" onTablet="span6" onDesktop="span3">
                        <div className="boxchart">5,6,7,2,0,4,2,4,8,2,3,3,2</div>
                        <div className="number">854<i className="icon-arrow-up"></i></div>
                        <div className="title">visits</div>
                        <div className="footer">
                            <a href="#"> read full report</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

export default Home;
