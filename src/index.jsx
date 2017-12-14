/*
* @Author: Jackhui
* @Date:   2017-11-30 12:19:54
*/

'use strict';
// react
import React from 'react';
// react-dom
import { render } from 'react-dom';
// react-router
import { Router, Route, IndexRedirect, Link, hashHistory } from 'react-router';
// bootstrap
import 'node_modules/bootstrap/dist/css/bootstrap.min.css';
// import 'node_modules/bootstrap/dist/js/bootstrap.min.js';
// bootstrap sb-admin-2
import 'node_modules/sb-admin-2/dist/css/sb-admin-2.min.css';
// font-awesome
import 'node_modules/font-awesome/css/font-awesome.min.css';

// page
import Layout               from 'page/layout/index.jsx';
import Home                 from 'page/home/index.jsx';
import ProductList          from 'page/product/index/index.jsx';
import ProductSave          from 'page/product/index/save.jsx';
import ProductDetail        from 'page/product/index/detail.jsx';
import ProductCategory      from 'page/product/category/index.jsx';
import ProductCategoryAdd   from 'page/product/category/add.jsx';
import OrderList            from 'page/order/index.jsx';
import OrderHistory         from 'page/order/history.jsx'
import OrderDetail          from 'page/order/detail.jsx';
import Advertisement        from 'page/advertisement/index.jsx';
import Login                from 'page/login/index.jsx';
import ErrorPage            from 'page/error/index.jsx';
import BlankPage            from 'page/blank/index.jsx';
import Customer             from 'page/customer/index.jsx';
import Shop                 from 'page/shop/index.jsx';
import Merchant             from 'page/metchant/index.jsx';
import Message              from 'page/message/index.jsx';

// render router
render(
    <Router history={hashHistory}>
        <Route path="/">
            {/* home */} 
            <IndexRedirect to="home" />
            <Route path="home" component={Layout}>
                <IndexRedirect to="index" />
                <Route path="index" component={Home}/>
            </Route>
            {/* customer*/}
            <Route path="customer" component={Layout}>
                <IndexRedirect to="index" />
                <Route path="index" component={Customer}/>
            </Route>
            {/* shop*/}
            <Route path="shop" component={Layout}>
                <IndexRedirect to="index" />
                <Route path="index" component={Shop}/>
            </Route>
            {/* merchant*/}
            <Route path="merchant" component={Layout}>
                <IndexRedirect to="index" />
                <Route path="index" component={Merchant}/>
            </Route>
            {/* product */} 
            <Route path="product" component={Layout}>
                <IndexRedirect to="index" />
                <Route path="index" component={ProductList}/>
                <Route path="save(/:pId)" component={ProductSave}/>
                <Route path="detail/:pId" component={ProductDetail}/>
            </Route>
            <Route path="product.category" component={Layout}>
                <IndexRedirect to="index" />
                <Route path="index(/:categoryId)" component={ProductCategory}/>
                <Route path="add" component={ProductCategoryAdd}/>
            </Route>
            {/* order */} 
            <Route path="order" component={Layout}>
                <IndexRedirect to="index" />
                <Route path="index" component={OrderList}/>
                <Route path="history" component={OrderHistory}/>
                <Route path="detail/:orderNumber" component={OrderDetail}/>
            </Route>
            {/* message */}
            <Route path="message" component={Layout}>
                <IndexRedirect to="index" />
                <Route path="index" component={Message} />
            </Route>
            {/* advertisment */}
            <Route path="ad" component={Layout}>
                 <IndexRedirect to="index" />
            <Route path="index" component={Advertisement} />
            </Route>
            {/* without layout */} 
            <Route path="login" component={Login}/>
            <Route path="blank" component={Layout}>
                <IndexRedirect to="index" />
                <Route path="index" component={BlankPage}/>
            </Route>
            <Route path="*" component={ErrorPage}/>
        </Route>
        
    </Router>, 
    document.getElementById('app')
);
