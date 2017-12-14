/*
* @Author: Rosen
* @Date:   2017-02-11 18:46:37
* @Last Modified by:   Rosen
* @Last Modified time: 2017-04-09 23:36:03
*/

'use strict';
import React        from 'react';
import ReactDOM     from 'react-dom';
import { Link }     from 'react-router';

import PageTitle    from 'component/page-title/index.jsx';
import Pagination   from 'component/pagination/index.jsx';

import MMUtile      from 'util/mm.jsx';

const _mm = new MMUtile();

// import './index.scss';

const IncomeTrend = React.createClass({
    getInitialState() {
        return {
            list            : [],
            listType        : 'list', // list / search
            searchType      : 'productId', // productId / productName
            searchKeyword   : '',
            pageNum         : 1
        };
    },
    componentDidMount(){
        this.loadProductList();
    },
    // 加载产品列表
    loadProductList(pageNum){
        let listParam       = {},
            listType        = this.state.listType,
            searchType      = this.state.searchType;

        listParam.listType  = listType;
        listParam.pageNum   = pageNum || this.state.pageNum;
        // 按商品名搜索
        if(listType == 'search' && searchType == "productName"){
            listParam.productName = this.state.searchKeyword;
        }
        // 按商品id搜索
        if(listType == 'search' && searchType == "productId"){
            listParam.productId = this.state.searchKeyword;
        }
        // Search
        _product.getProductList(listParam).then(res => {
            console.log(res)
            this.setState(res);
        }, err => {
            _mm.errorTips(err.msg || err.statusText);
        });
    },
    // 搜索类型变化
    onSearchTypeChange(e){
        let searchType = e.target.value;
        this.setState({
            searchType : searchType
        });
    },
    // 关键词变化
    onKeywordChange(e){
        let keyword = e.target.value;
        this.setState({
            searchKeyword : keyword
        });
    },
    // 搜索
    onSearch(){
        this.setState({
            listType    : 'search'
        }, () => {
            this.loadProductList(1);
        });
    },
    // 页数变化
    onPageNumChange(pageNum){
        this.loadProductList(pageNum);
    },
    setProductStatus(productId, status){
        let currentStatus   = status,
            newStatus       = currentStatus == 1 ? 2 : 1,
            statusChangeTips= currentStatus == 1 ? 'Confirm that you want not to sale this commodity?' : 'Confirm that you want to sale this commodity';
        if(window.confirm(statusChangeTips)){
            _product.setProductStatus(productId, newStatus).then(res => {
                // 操作成功提示
                _mm.successTips(res);
                this.loadProductList();
            }, err => {
                _mm.errorTips(err.msg);
            });
        }
    },
    render() {

        return (
            <div id="page-wrapper">
                <PageTitle pageTitle="Revenue trends"/>
            </div>
        );
    }
});

export default IncomeTrend;
