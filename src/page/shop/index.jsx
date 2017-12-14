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
import Shop         from 'service/shop.jsx';

const _mm = new MMUtile();
const _shop = new Shop();

import './index.scss';

const ProductList = React.createClass({
    getInitialState() {
        return {
            list            : [],
            pageNum         : 1,
            listType      : 'list',
            searchKeyword   : ''
        };
    },
    componentDidMount(){
        this.loadShopList();
    },
    loadShopList(pageNum){
        let listParam       = {},
            listType        = this.state.listType;
        listParam.listType  = listType;
        listParam.pageNum   = pageNum || this.state.pageNum;
        if(listType == 'search'){
            listParam.id = this.state.searchKeyword;
            listParam.id = parseInt(listParam.id);
        }
        // 查询
        _shop.ShopList(listParam).then(res => {
            console.log(res);
            this.setState(res);
        }, err => {
            console.log(err.msg);
            _mm.errorTips(err.msg);
        });
    },
    onKeywordChange(e){
        let keyword = e.target.value;
        this.setState({
            searchKeyword : keyword
        });
    },
    onPageNumChange(pageNum){
        this.loadShopList(pageNum);
    },
    onSearch(){
        this.setState({
            listType    : 'search'
        }, () => {
            this.loadShopList(1);
        });
    },
    delshop(id) {
        if (window.confirm("Whether to delete the shop？")) {
            _shop.Del(id).then(res => {
                _mm.successTips(res);
                window.location.href = '#/shop';
            }, err => {
                console.log(err.msg);
                _mm.errorTips(err.msg);
            });
        }
    },
    shopBlacklist(id) {
        if (window.confirm("Whether to put this shop blacklist？")) {
            // 发出一个拉黑商铺的请求
            _shop.ShopBlacklist(id).then(res => {
                _mm.successTips(res);
            }, err => {
                console.log(err.msg);
                _mm.errorTips(err.msg);
            });
        }
    },
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle pageTitle="ShopManagement">
                </PageTitle>
                <div className="row">
                    <div className="search-wrap col-md-12">
                        <div className="form-inline">
                            <div className="form-group">
                                    <h5>search by id</h5>
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
                                <th className="col25">shopid</th>
                                <th className="col25">userid</th>
                                <th className="col10">shopstatus</th>
                                <th className="col10">createtime</th>
                                <th className="col10">updatetime</th>
                                <th className="col10" colSpan={2}>option</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.list.length ? this.state.list.map((shop, index) => {
                                        return (
                                            <tr key={index}>
                                                <th>{shop.id}</th>
                                                <th>{shop.userId}</th>
                                                <th>{shop.shopState}</th>
                                                <th>{shop.createTime}</th>
                                                <th>{shop.updateTime}</th>
                                                {shop.shopState==0?
                                                    <th><button type="submit" disabled="disabled">blacklist</button></th>
                                                    :
                                                    <th><button type="submit" onClick={this.shopBlacklist.bind(this,shop.id)}>blacklist</button></th>
                                                }
                                                <th><button type="submit" onClick={this.delshop.bind(this,shop.id)}>delete</button></th>
                                            </tr>
                                        );
                                    }) :
                                    (
                                        <tr>
                                            <td colSpan="7" className="text-center">No Result~</td>
                                        </tr>
                                    )
                            }

                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        );
    }
});

export default ProductList;
