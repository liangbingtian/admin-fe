/*
* @Author: Rosen
* @Date:   2017-02-13 10:22:06
* @Last Modified by:   Rosen
* @Last Modified time: 2017-04-13 15:36:53
*/

'use strict';
import React        from 'react';
import ReactDOM     from 'react-dom';
import { Link }     from 'react-router';

import PageTitle    from 'component/page-title/index.jsx';
import FileUploader from 'component/file-uploader/index.jsx';
import RichEditor   from 'component/rich-editor/index.jsx';

import MMUtile from 'util/mm.jsx';
import Seller      from 'service/seller.jsx';

const _mm = new MMUtile();
const _seller = new Seller();

import './saveadvert.scss';

const SaveAdvert = React.createClass({
    getInitialState() {
        let params = this.props.location.query; //一个商品id，一个是广告位置location
        return {
            //数据
            type         :   params.id ? true : false,
            list         :   [],
            urlId        :   params.id,
            urlLocation  :   params.location,
            currentId    :   '',
            currentImage :   ''
        };
    },
    componentDidMount: function(){
        this.loadUnAdvertProduct();
    },

    //加载店家所有的为定为广告的商品
    loadUnAdvertProduct(){
        _seller.getProductList().then(res=>{
            this.setState(res);
            console.log(this.state.list);
        })
    },

    //获取当前选择框的商品的id、并获取当前这个商品的广告图（如果有的话）
    getProductId(event){
        // console.log(event.target.firstChild);
        var currentSlect = event.target.value;
        this.setState({currentId:currentSlect});
        // console.log('到外面');
        for(let i = 0;i<this.state.list.length;i++){
            // console.log('中间')
            if(parseInt(currentSlect) === parseInt(this.state.list[i].id)){
                // console.log('最里面')
                console.log(this.state.list[i].advertImage);
                this.setState({currentImage:this.state.list[i].advertImage});
                break;
            }
        }
    },

    // 图片上传成功
    onUploadSuccess(res){
        // let subImages = this.state.subImages;
        // subImages.push(res.data.uri);
        this.setState({
            currentImage: res.data.uri
        });
    },
    // 图片上传失败
    onUploadError(err){
        alert(err.message || 'Where is wrong~');
    },

    //删除原有或者刚上传的广告图
    onDeleteImage(){
        this.setState({currentImage:''});
    },

    //验证要提交的广告信息是否合格
    checkAdvert(advert){
        let result = {
            status  : true,
            msg     : '验证通过'
        };

        if(!advert.location){
            result = {
                status  : false,
                msg     : '请确认广告的放置位置'
            }
        }

        if(advert.advertImage == ''){
            result = {
                status  : false,
                msg     : 'Please upload a ad image'
            }
        }

        if(advert.id == ''){
            result = {
                status  : false,
                msg     : 'Please select the appropriate product'
            }
        }

        return result;
    },

    //提交表单
    onSubmit(e){
        //组织提交
        e.preventDefault();
        //需要提交的字段
        let advert={
            id          :    this.state.currentId,
            advertImage :    this.state.currentImage,
            location    :    this.state.urlLocation
            },
            checkAdvert = this.checkAdvert(advert);

        //验证通过后，提交商品信息
        if(checkAdvert.status){
            _seller.saveAdvert(advert).then(res=>{
                alert("新增广告成功");
                window.location.href = '#/home/index';
            },err=>{
                alert(err.msg   || 'Where is wrong~');
            })
        }else{
            alert(checkAdvert.msg);
        }

    },

    render() {
        return (
            <div id="page-wrapper">
                <PageTitle pageTitle={'In-store advertising -- ' + (this.state.type ? 'Replace '+this.state.urlLocation+' digit advertisement' : 'Add '+this.state.urlLocation+' digit advertisement')}/>
                <div className="row">
                    <div className="form-wrap col-lg-12">
                        <div className="form-horizontal">
                            {/*选择商品*/}
                            <div className="form-group">
                                <label htmlFor="name" className="col-md-2 control-label">Choose product</label>
                                <div className="col-md-5">
                                    <select className="form-control" name="name" onChange={this.getProductId}>
                                        <option value=""></option>
                                        {
                                            this.state.list.length !==0 ? this.state.list.map((product,index)=>{
                                                return(
                                                    <option value={product.id} data-id={product.id}>{product.name}--{product.subtitle}</option>
                                                )
                                            }): (
                                                <option value="">You do not have more products available for advertising</option>
                                            )
                                        }
                                    </select>
                                </div>
                                <label htmlFor="" className="control-label">(Product id is：{this.state.currentId})</label>
                            </div>

                            {/*上传文件*/}
                            <div className="form-group">
                                <label htmlFor="document" className="col-md-2 control-label">Ad Image</label>
                                <div className="img-con col-md-10">
                                    {
                                        this.state.currentImage !=='' ? (
                                            <div className="sub-img" key='1'>
                                                <img className="img" src={_mm.getImageUrl(this.state.currentImage)}/>
                                                <i className="fa fa-close fa-fw" onClick={this.onDeleteImage}></i>
                                            </div>
                                        ) : <div className="notice">Please upload image</div>
                                    }
                                </div>
                                <div className="col-md-offset-2 col-md-10">
                                    <FileUploader onSuccess={this.onUploadSuccess} onError={this.onUploadError}/>
                                </div>
                            </div>

                            {/*提交按钮*/}
                            <div className="form-group">
                                <div className="col-md-offset-2 col-md-10">
                                    <button type="btn" className="btn btn-xl btn-primary" onClick={this.onSubmit}>Submit</button></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

export default SaveAdvert;