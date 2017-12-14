'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';

import PageTitle from 'component/page-title/index.jsx';

import MMUtile from 'util/mm.jsx';
import Seller from 'service/seller.jsx';

import './index.scss'

const _mm = new MMUtile();
const _seller = new Seller();

const Home = React.createClass({
    getInitialState() {
        return {
            //键值对数据
            list            : [],   //广告列表
            showCtrl        : '',
            id              : '',
            productName     : '',
            productList     : [],
        };
    },
    //组件装载完要进行的操作
    componentDidMount: function () {
        this.loadAdvertList();
        this.loadProductList();
    },
    //加载广告列表
    loadAdvertList() {
        _seller.getAdvertList().then(res => {
            this.setState(res);
            this.sortAdvert(this.state.list);
        }, err => {
            _mm.errorTips(err.msg || err.statusText);
        })
    },

    //排列广告
    sortAdvert(list){
        var sortList = [{location:-1},{location:-1},{location:-1}];

        for(let i = 1;i<=3;i++){
            for(let j = 0;j<list.length;j++){
                if(i === list[j].location){
                    sortList[i-1] = list[j];
                }
            }
        }

        this.setState({list:sortList});
    },

    //删除广告
    deleteAdvert(event){
        const id = event.target.getAttribute("data-id");

        let conf = confirm("Are you sure you want to delete this ad?");

        if(conf == true){
            _seller.deleteAdvert(id).then(
                    this.loadAdvertList()

                // err=>{
                //     console.log('错在这')
                //     _mm.errorTips(err.msg || err.statusText);
                // }
            )
        }
    },

    //加载页面的商品
    loadProductList(){
        _seller.getProductList().then(res=>{
            // this.setState({productList:res.list});
            console.log(res.list)
            this.selectProduct(res.list);
        },err=>{
            _mm.errorTips(err.msg || err.statusText);
        })
    },

    //提取已在页面中的商品并找好
    selectProduct(oldList){
        let list = [],
            j    = 0;
        for(let i = 0;i<oldList.length;i++){
            if(parseInt(oldList[i].location) !== -1){
                list.push(oldList[i]);
                /*list[j] = {};
                _mm.copy(oldList[i],list[j]);
                j++;*/
            }
        }

        // console.log(list);
        list.sort(this.compare('location'));

        // console.log(list);

        let num = list.length,
            newList = [];
        for(let i = 1;i<=16;i++){
            if(i === list[0].location){
                newList.push(list[0]);
                list.shift();
            }else{
                newList.push(0);
            }
        }

        console.log('执行到这里了'+newList);

        this.setState({productList:newList});

        console.log(this.state.productList);
    },

    //比较商品列表中location的大小
    compare(property){
        return function(a,b){
            var value1 = parseInt(a[property]);
            var value2 = parseInt(b[property]);
            return value1 - value2;
        }
    },



    render() {
        return (
            <div id="page-wrapper">
                <PageTitle pageTitle="Edit storefront"/>
                <div className="row">
                    {/*广告层*/}
                    <div className="col-lg-12 col-md-12 advertcontain">
                        {
                            this.state.list.map((advert,index)=>{
                                if(advert.location !== -1){
                                    return (
                                        <div key={index} className="col-lg-3 col-md-3 advertblock">
                                            <div>
                                                <div>id:{advert.id} {advert.name}</div>
                                                <Link className="advertoperate advert-delete" onClick={this.deleteAdvert} data-id={advert.id}>Delete</Link>
                                                <Link to={
                                                    {
                                                        pathname    :   "/home/addadvert",
                                                        query       :   {id:advert.id,location:advert.location}
                                                    }
                                                } className="advertoperate advert-change">Replace</Link>
                                            </div>
                                        </div>
                                    )
                                }else{
                                    return (
                                        <div key={index} className="col-lg-3 col-md-3 advertblock">
                                            <Link className="advertplus" to={
                                                {
                                                    pathname    :   "/home/addadvert",
                                                    query       :   {location:index+1}
                                                }
                                            } title="Click Add ad"><i
                                                className="fa fa-plus fa-5x advertadd" aria-hidden="true"></i></Link>
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>


                    {/*商品层*/}
                    <div className="col-lg-12 col-md-12 productcontain">
                        {/*第一层*/}
                        <div className="col-lg-3 col-md-3 productblock">
                            <i className="fa fa-plus fa-5x advertadd" aria-hidden="true"></i>
                        </div>
                        <div className="col-lg-3 col-md-3 productblock">
                            <i className="fa fa-plus fa-5x advertadd" aria-hidden="true"></i>
                        </div>
                        <div className="col-lg-3 col-md-3 productblock">
                            <i className="fa fa-plus fa-5x advertadd" aria-hidden="true"></i>
                        </div>
                        <div className="col-lg-3 col-md-3 productblock">
                            <i className="fa fa-plus fa-5x advertadd" aria-hidden="true"></i>
                        </div>
                        <div className="col-lg-3 col-md-3 productblock">
                            <i className="fa fa-plus fa-5x advertadd" aria-hidden="true"></i>
                        </div>
                        <div className="col-lg-3 col-md-3 productblock">
                            <i className="fa fa-plus fa-5x advertadd" aria-hidden="true"></i>
                        </div>
                        <div className="col-lg-3 col-md-3 productblock">
                            <i className="fa fa-plus fa-5x advertadd" aria-hidden="true"></i>
                        </div>
                        <div className="col-lg-3 col-md-3 productblock">
                            <i className="fa fa-plus fa-5x advertadd" aria-hidden="true"></i>
                        </div>
                        <div className="col-lg-3 col-md-3 productblock">
                            <i className="fa fa-plus fa-5x advertadd" aria-hidden="true"></i>
                        </div>
                        <div className="col-lg-3 col-md-3 productblock">
                            <i className="fa fa-plus fa-5x advertadd" aria-hidden="true"></i>
                        </div>
                        <div className="col-lg-3 col-md-3 productblock">
                            <i className="fa fa-plus fa-5x advertadd" aria-hidden="true"></i>
                        </div>
                        <div className="col-lg-3 col-md-3 productblock">
                            <i className="fa fa-plus fa-5x advertadd" aria-hidden="true"></i>
                        </div>
                        <div className="col-lg-3 col-md-3 productblock">
                            <i className="fa fa-plus fa-5x advertadd" aria-hidden="true"></i>
                        </div>
                        <div className="col-lg-3 col-md-3 productblock">
                            <i className="fa fa-plus fa-5x advertadd" aria-hidden="true"></i>
                        </div>

                        {

                        }

                        {/*新增商品格子*/}
                        <div className="col-lg-3 col-md-3 newproductblock" title="新增商品">
                            <i className="fa fa-plus fa-5x advertadd" aria-hidden="true"></i>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

export default Home;
