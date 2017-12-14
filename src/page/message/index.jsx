
'use strict';
import React        from 'react';
import ReactDOM     from 'react-dom';
import './index.scss';
import MMUtile      from 'util/mm.jsx';
import PageTitle    from 'component/page-title/index.jsx';
import Pagination   from 'component/pagination/index.jsx';
import Customer     from 'service/customer.jsx';
const _mm = new MMUtile();
const _customer = new Customer();
const Message = React.createClass({
    getInitialState() {
        return {
            list            : []
        };
    },
    componentDidMount: function(){
        this.loadMessageList();
    },
    loadMessageList(){
        let listParam       = {};
        _customer.getMessage(listParam).then(res => {
        console.log(res);
        this.setState(res);
        }, err => {
             _mm.errorTips(err.msg || err.statusText);
        });
    },
    ApplyY(name){
        let idvalue    ={};
        idvalue.value  =1;
        idvalue.name   =name;
        console.log(idvalue.value);
        console.log(idvalue.name);
        if (window.confirm("approve?")) {
        _customer.Messageapply(idvalue).then(res => {
            console.log(res)
            window.alert("approved");
            this.loadMessageList();
        }, err => {
            _mm.errorTips(err.msg);
        });
        }

    },
    ApplyN(name){
        let idvalue    = {};
        idvalue.value  = 0;
        idvalue.name   =name;
        console.log(idvalue.name);
        console.log(idvalue.value);
        if (window.confirm("reject?")) {
        _customer.Messageapply(idvalue).then(res => {
            console.log(res);
            window.alert("rejected");
            this.loadMessageList();
        }, err => {
            _mm.errorTips(err.msg);
        });
        }
    },
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle pageTitle="ShopApply"/>
                <div className="row">
                    <div className="table-wrap col-lg-12 ">

                        <table className="table table-striped table-bordered table-hover" >

                            <thead>
                            <tr>
                                <th className="col25">applicantid</th>
                                <th className="col25">name</th>
                                <th className="col10">status</th>
                                <th className="col10" colSpan={2}>option</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.list.length ? this.state.list.map((customer, index) =>{
                                    return (
                                        <tr key={index}>
                                            <th>{customer.userId}</th>
                                            <th>{customer.username}</th>
                                            <th>{customer.userState==0?"whitelist":"blacklist"}</th>
                                            <th><button id="ApplyY" type="submit" onClick={this.ApplyY.bind(this,customer.username)}>approve</button></th>
                                            <th><button id="ApplyN" type="submit" onClick={this.ApplyN.bind(this,customer.username)}>reject</button></th>
                                        </tr>
                                    );

                            }) : (
                            <tr>
                                <td colSpan={5} className="text-center">No new shop application~</td>
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

export default Message;
