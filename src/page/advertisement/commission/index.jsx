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
import './index.scss'
import MMUtile      from 'util/mm.jsx';
import Advertisement      from 'service/advertisement.jsx';

const _mm = new MMUtile();
const _advertisement = new Advertisement();

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
    // // load merchant list
    // loadMerchantList(pageNum){
    //     let listParam       = {},
    //         listType        = this.state.listType,
    //         searchType      = this.state.searchType;
    //
    //     listParam.listType  = listType;
    //     listParam.pageNum   = pageNum || this.state.pageNum;
    //     // search by name
    //     if(listType == 'search'){
    //         listParam.userId = this.state.searchKeyword;
    //         listParam.userId = parseInt(listParam.userId);
    //     }
    //     // search function
    //     _merchant.getMerchantList(listParam).then(res => {
    //         console.log(res);
    //         this.setState(res);
    //     }, err => {
    //         _mm.errorTips(err.msg || err.statusText);
    //     });
    // },
    // // keyword change
    // onKeywordChange(e){
    //     let keyword = e.target.value.trim();
    //     this.setState({
    //         searchKeyword : keyword
    //     });
    // },
    // // search
    // onSearch(){
    //     this.setState({
    //         listType    : 'search'
    //     }, () => {
    //         this.loadMerchantList(1);
    //     });
    // },
    // // 页数变化
    // onPageNumChange(pageNum){
    //     this.loadMerchantList(pageNum);
    // },
    // setMerchantBlacklist(username){
    //     if(window.confirm('Are you sure to take him into blacklist?')){
    //         _merchant.setMerchantBlacklist(username).then((res) => {
    //             console.log(res);
    //             _mm.successTips(res);
    //             this.loadMerchantList();
    //         }, err => {
    //             console.log(err.msg);
    //             _mm.errorTips(err.msg);
    //         });
    //     }
    // },
    // deleteMerchant(id) {
    //     if (window.confirm("Are you sure to delete this merchant")) {
    //         _merchant.deleteMerchant(id).then((res) => {
    //             console.log(res);
    //             _mm.successTips(res);
    //             this.loadMerchantList();
    //         }, err => {
    //             console.log(err.msg);
    //             _mm.errorTips(err.msg);
    //         })
    //     }
    // },
    render() {

        return (
            <div id="page-wrapper">
                <PageTitle pageTitle="Commission">
                </PageTitle>
                <div className="row">
                    <div className="col-md-8">
                        <h3 className="title"><b>Calculate the Commission</b></h3>
                        <hr/>

                    </div>
                   <div className="col-md-4">
                       <h3 className="title"><b>Modify the Commission</b></h3>
                       <hr/>
                       <h5><b>The current commission rate:</b></h5>
                       <b className="currentrate">99%</b>
                       <hr/>
                       <div>
                           <i><b>Please input commission rate</b></i>
                       </div>
                       <br/>
                       <div className="input-warning alert alert-warning">
                               <span><i className="glyphicon glyphicon-warning-sign alert-warning"></i></span>
                               <b>&nbsp;&nbsp;Input can not be empty</b>
                           <br/>
                       </div>
                       <input className="col-md-5 col-md-offset-1 rateInput" min="1" max="100" type="number" placeholder="20"/>
                       <button className="btn btn-primary col-md-3 col-md-offset-2">submit</button>

                   </div>
                    <div className="table-wrap col-lg-12">

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
