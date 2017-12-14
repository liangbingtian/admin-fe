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
import Merchant      from 'service/merchant.jsx';

const _mm = new MMUtile();
const _merchant = new Merchant();

import './index.scss';

const ProductList = React.createClass({
    getInitialState() {
        return {
            list            : [],
            listType        : 'list',
            searchKeyword   : '',
            pageNum         : 1
        };
    },
    componentDidMount(){
        this.loadMerchantList();
    },
    // load merchant list
    loadMerchantList(pageNum){
        let listParam       = {},
            listType        = this.state.listType,
            searchType      = this.state.searchType;

        listParam.listType  = listType;
        listParam.pageNum   = pageNum || this.state.pageNum;
        // search by name
        if(listType == 'search'){
            listParam.userId = this.state.searchKeyword;
            listParam.userId = parseInt(listParam.userId);
        }
        // search function
        _merchant.getMerchantList(listParam).then(res => {
            console.log(res);
            this.setState(res);
        }, err => {
            _mm.errorTips(err.msg || err.statusText);
        });
    },
    // keyword change
    onKeywordChange(e){
        let keyword = e.target.value.trim();
        this.setState({
            searchKeyword : keyword
        });
    },
    // search
    onSearch(){
        this.setState({
            listType    : 'search'
        }, () => {
            this.loadMerchantList(1);
        });
    },
    // 页数变化
    onPageNumChange(pageNum){
        this.loadMerchantList(pageNum);
    },
    setMerchantBlacklist(username){
        if(window.confirm('Are you sure to take him into blacklist?')){
            _merchant.setMerchantBlacklist(username).then((res) => {
                console.log(res);
                _mm.successTips(res);
                this.loadMerchantList();
            }, err => {
                console.log(err.msg);
                _mm.errorTips(err.msg);
            });
        }
    },
    deleteMerchant(id) {
        if (window.confirm("Are you sure to delete this merchant")) {
            _merchant.deleteMerchant(id).then((res) => {
                console.log(res);
                _mm.successTips(res);
                this.loadMerchantList();
            }, err => {
                console.log(err.msg);
                _mm.errorTips(err.msg);
            })
        }
    },
    render() {

        return (
            <div id="page-wrapper">
                <PageTitle pageTitle="Merchant Manage">
                </PageTitle>
                <div className="row">
                    <div className="search-wrap col-md-12">
                        <div className="form-inline">
                            <div className="form-group">
                              <div className="form-group">
                              <span>Search by id</span>
                              </div>
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="keyword" onChange={this.onKeywordChange}/>
                            </div>
                            <button type="button" className="btn btn-default" onClick={this.onSearch}>Search</button>
                        </div>
                    </div>
                    <div className="table-wrap col-lg-12">
                        <table className="table table-striped table-bordered table-hover">
                            <thead>
                            <tr>
                                <th>userId</th>
                                <th>username</th>
                                <th>shopId</th>
                                <th>ShopStatus</th>
                                <th>Options</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.list.length ? this.state.list.map((merchant, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>
                                                  <p>{merchant.userId}</p>
                                                </td>
                                                <td>
                                                    <p>{merchant.username}</p>
                                                </td>
                                                <td>
                                                  <p>{merchant.shopId}</p>
                                                </td>
                                                <td>
                                                    <span>{merchant.shopState == 0 ? 'blacklist' : 'whitelist'}</span>
                                                </td>
                                                <td>
                                                    <a className="opear"
                                                       onClick={this.setMerchantBlacklist.bind(this, merchant.username)}>
                                                        blacklist</a>
                                                    <a className="opear" onClick={this.deleteMerchant.bind(this, merchant.userId)}>delete</a>
                                                </td>
                                            </tr>
                                        );
                                    }) :
                                    (
                                        <tr>
                                            <td colSpan="5" className="text-center">no result~</td>
                                        </tr>
                                    )
                            }

                            </tbody>
                        </table>
                    </div>
                    {
                        this.state.pages > 1 ? <Pagination onChange={this.onPageNumChange}
                                                           current={this.state.pageNum}
                                                           total={this.state.total}
                                                           showLessItems/>: null
                    }
                </div>
            </div>
        );
    }
});

export default ProductList;
