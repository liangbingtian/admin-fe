'use strict';
import React        from 'react';
import ReactDOM     from 'react-dom';
import { Link }     from 'react-router';

import PageTitle    from 'component/page-title/index.jsx';
import Pagination   from 'component/pagination/index.jsx';

import MMUtile      from 'util/mm.jsx';
import Order        from 'service/order.jsx';

const _mm = new MMUtile();
const _order = new Order();

import './index.scss';

const OrderList = React.createClass({
    getInitialState() {
        return {
            list            : [],
            pageNum         : 1
        };
    },
    componentDidMount(){
        this.loadOrderList();
    },
    // 加载产品列表
    loadOrderList(){
        let listParam       = {};
        listParam.pageNum   = this.state.pageNum;
        listParam.timetype  = this.state.time_type||'day';
        // 查询
        _order.getOrderList(listParam).then(res => {
            this.setState(res);
        }, errMsg => {
            _mm.errorTips(errMsg);
        });
    },
    // 搜索
    onSearch(){
        var s=document.getElementById("xz").value;
        this.setState({
                time_type   : s,
                pageNum     : 1
        }, () => {
                this.loadOrderList();
        });

    },
    onSearchNo(){
        if(this.state.orderNumber){
            window.location.href='#/order/detail/'+this.state.orderNumber;
        }

    },
    onOrderNumberChange(e){
        let orderNumber = e.target.value.trim();
        this.setState({
            orderNumber : orderNumber
        });
    },
    // 页数变化
    onPageNumChange(pageNum){
        this.setState({
            pageNum     : pageNum
        }, () => {
            this.loadOrderList();
        });
    },

    render() {
        return (
            <div id="page-wrapper">
                <PageTitle pageTitle="ordermangement"/>
                <div className="row">
                    <div className="search-wrap col-md-12">
                        <div className="form-inline">
                            <div className="form-group">
                                <select className="form-control" id="xz">
                                    <option value="day">search by day</option>
                                    <option value="week">search by week</option>
                                    <option value="month">search by month</option>
                                    <option value="year">search by year</option>
                                </select>
                            </div>
                            <button type="button" className="btn btn-default" onClick={this.onSearch}>Search</button>
                            <button type="button" className="btn btn-default" id="orderNoSearch" onClick={this.onSearchNo}>Search</button>
                            <input type="text" className="form-control" id="orderNoInput" placeholder="订单号" onChange={this.onOrderNumberChange}/>

                                <h3>total Income:   {this.state.totalIncome?this.state.totalIncome:0}</h3>
                        </div>
                    </div>
                    <div className="table-wrap col-lg-12">
                        <table className="table table-striped table-bordered table-hover">
                            <thead>
                            <tr>
                                <th>orderNo</th>
                                <th>customerName</th>
                                <th>orderStatus</th>
                                <th>orderPayment</th>
                                <th>createTime</th>
                                <th>option</th>
                            </tr>

                            </thead>
                            <tbody>
                            {
                                this.state.list.length ? this.state.list.map((order, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    <Link className="opear" to={ '/order/detail/' + order.orderNo}>{order.orderNo}</Link>
                                                </td>
                                                <td>{order.receiverName}</td>
                                                <td>{order.statusDesc}</td>
                                                <td>￥{order.payment}</td>
                                                <td>{order.createTime}</td>
                                                <td>
                                                    <Link className="opear" to={ '/order/detail/' + order.orderNo}>view</Link>
                                                </td>
                                            </tr>
                                        );
                                    }) :
                                    (
                                        <tr>
                                            <td colSpan="6" className="text-center">NoResult~</td>
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

export default OrderList;