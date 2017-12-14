/*
* @Author: Jackhui
* @Date:   2017-12-03 18:46:37
*/

'use strict';
import React        from 'react';
import ReactDOM     from 'react-dom';
import { Link }     from 'react-router';

import PageTitle    from 'component/page-title/index.jsx';
import Pagination   from 'component/pagination/index.jsx';

import MMUtile      from 'util/mm.jsx';
import Customer     from 'service/customer.jsx';

const _mm = new MMUtile();
const _customer = new Customer();

import './index.scss';

const ProductList = React.createClass({
    getInitialState() {
        return {
            list            : [],
            listType        : 'list', // list / search
            searchKeyword   : '',
            pageNum         : 1
        };
    },
    componentDidMount(){
        this.loadCustomerList();
    },
    // load customer list
    loadCustomerList(pageNum){
        let listParam       = {},
            listType        = this.state.listType,
            searchType      = this.state.searchType;
        listParam.listType  = listType;
        listParam.pageNum   = pageNum || this.state.pageNum;
        // search by name
        if(listType == 'search'){
            listParam.username = this.state.searchKeyword;
        }
        // 查询
        _customer.getCustomerList(listParam).then(res => {
            console.log(res);
            this.setState(res);
        }, err => {
            _mm.errorTips(err.msg || err.statusText);
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
            this.loadCustomerList(1);
        });
    },
    // 页数变化
    onPageNumChange(pageNum){
        this.loadCustomerList(pageNum);
    },
    delCustomer(username) {
        if (window.confirm("Do you want to delete this user?")) {
           _customer.deleteCustomer(username).then((res) => {
               console.log(res);
               _mm.successTips(res);
               this.loadCustomerList();
           }),err => {
                console.log(err.msg);
                _mm.errorTips(err.msg);
        }}
    },
    customerBlacklist(username){
        if(window.confirm('Are you sure to take him into blacklist?')){
            _customer.setCustomerBlacklist(username).then(res => {
                console.log(res);
                _mm.successTips(res);
                this.loadCustomerList();
            }, err => {
                console.log(err.msg);
                _mm.errorTips(err.msg);
            });
        }
    },
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle pageTitle="UserManagement">
                </PageTitle>
                <div className="row">
                    <div className="search-wrap col-md-12">
                        <div className="form-inline">
                            <div className="form-group">
                            <span>Search by username</span>
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="keyword" onChange={this.onKeywordChange}/>
                            </div>
                            <button type="button" className="btn btn-default" onClick={this.onSearch}>Search</button>
                        </div>
                    </div>
                    <div className="table-wrap col-lg-12 col-md-12">
                        <table className="table table-striped table-bordered table-hover">
                            <thead>
                            <tr>
                                <th>id</th>
                                <th>username</th>
                                <th>email</th>
                                <th>telphone</th>
                                <th>role</th>
                                <th>userState</th>
                                <th>options</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.list.length ? this.state.list.map((customer, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{customer.id}</td>
                                                <td>
                                                    <p>{customer.username}</p>
                                                </td>
                                                <td>
                                                    <p>{customer.email}</p>
                                                </td>
                                                <td>
                                                    <p>{customer.phone}</p>
                                                </td>
                                                <td>
                                                    <span>{customer.role == 1 ? 'customer' : 'merchant'}</span>
                                                </td>
                                                <td>
                                                    <span>{customer.userState == 0 ? 'blacklist' : 'whitelist'}</span>
                                                </td>
                                                <td>
                                                    <a className="opear"
                                                       onClick={this.customerBlacklist.bind(this, customer.username)}>
                                                      blacklist</a>
                                                    <a className="opear" onClick={this.delCustomer.bind(this, customer.username)}>delete</a>
                                                </td>
                                            </tr>
                                        );
                                    }) :
                                    (
                                        <tr>
                                            <td colSpan="7" className="text-center">no result~</td>
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
