import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { bindActionCreators } from 'redux';
import React, { PureComponent } from 'react';
import { NavBar, Icon, Popover, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import $ from 'jquery';
import html2canvas from 'html2canvas';

import toJS from '../../../libs/toJS';

import {
  goodsItem,
  professional,
  imageText,
  saveBase64Img,
} from './actions';

import {
  isLogin,
} from '../../App/actions';

import './index.less';

const Item = Popover.Item;

class ReportShare extends PureComponent {
  constructor(props) {
    window.history.replaceState({},
      document.title,
      window.location.pathname + window.location.hash,
    );
    super(props);
    this.state = {
      submitting: false,
      inspector_id: parseInt(this.props.params.inspector_id ? this.props.params.inspector_id : ''),
      goods_id: parseInt(this.props.params.goods_id ? this.props.params.goods_id : ''),
      bind_id: parseInt(this.props.params.bind_id ? this.props.params.bind_id : ''),
      item_id: parseInt(this.props.params.item_id ? this.props.params.item_id : ''),
      is_login: false,
      show: '',
      caseTitle:'报告',
      item_status: 1,
      tab: 'imageText',
      shareStatus: false,
      showImgStatus: false,
      visible: false,
      caseList: [],
      imageText: {
        list: [],
        img_result: '',
      },
      professional: {
        list: [],
        check_result: '',
        explain_result: '',
        decode_result: '',
        suggest: '',
        knowledge: '',
      },
      height:0,
    };
  }
  componentDidMount = async () => {
    this.setState({
      show: 'detail',
      is_login: true,
    });
    this.goodsItem();
  }
  goodsItem = async () => {
    const { actions } = this.props;
    const { goods_id, inspector_id, bind_id, item_id } = this.state;
    try {
      const { value: { status, msg, data }} = await actions.goodsItem({
        body: {
          goods_id: this.state.goods_id,
        },
      });
      let title = '';
      data.list.map(item => {
        if(item.item_id === item_id){
          title = item.item_name;
        }
      });
      this.setState({
        show: 'list',
        caseTitle: title,
        caseList: data.list,
        nextTitle: data.list[(data.list.length > 1 ? 1 : 0)].item_name,
      });
      this.imageText(goods_id, inspector_id, item_id, bind_id);
    } catch (error) {
      // 处理登录错误
      throw error;
    }
  }
  imageText = async (goods_id, inspector_id, item_id, bind_id) => {
    const { actions } = this.props;
    try {
      const { value: { status, msg, data }} = await actions.imageText({
        body: {
          goods_id: goods_id,
          item_id: item_id,
          bind_id: bind_id,
        },
      });
      this.setState({
        item_status: status === 1 ? data.item_status : 0,
        imageText: status === 1 ? data : null,
        submitting:true,
      });
    } catch (error) {
      // 处理登录错误
      throw error;
    }
  }
  savePng = () => {
    this.setState({
      shareStatus: true,
    });
    $(".report-detail-content").css({
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 1,
      margin: 0,
      background: '#2ABEC4',
      paddingBottom: "0",
    });
    window.scrollTo(0,0);
    let w = $(".report-detail-content").width();
    let h = $(".report-detail-content").height();
    let canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    let context = canvas.getContext("2d");
    context.scale(2, 2);
    Toast.loading('生成中...', 1, () => {
      html2canvas($(".report-detail-content")[0], {
        canvas: canvas,
      }).then((canvas) => {
        $(".report-detail-content").removeAttr('style');
        try {
          this.setState({
            shareStatus: false,
            showImgStatus: true,
          });
          let imgUrl = canvas.toDataURL("image/png");
          setTimeout(()=>{
            this.refs.shareImg.innerHTML = '<img src=' + imgUrl + ' />';
          },1000);
        } catch (err) {
          this.setState({
            shareStatus: false,
            showImgStatus: false,
          });
        }
      }).catch(function onRejected(error) {});
    });
  }
  onSelect = (opt) => {
    const {goods_id, inspector_id, item_id, bind_id ,caseList , tab } = this.state;
    let num = 0;
    let length = caseList.length;
    caseList.map((item,index)=>{
      if(opt.props.value === item.item_id){
        num = index;
      }
      return item;
    });
    this.setState({
      visible: false,
      caseTitle: opt.props.name,
      item_id: opt.props.value,
      nextTitle: caseList[num+1 >= length ? 0 : num+1].item_name,
    });

    if(tab === 'professional'){
      this.professional(goods_id, inspector_id, opt.props.value, bind_id);
    }else if(tab === 'imageText'){
      this.imageText(goods_id, inspector_id, opt.props.value, bind_id);
    }
  }
  next = ()=>{
    const { goods_id, inspector_id, item_id, bind_id ,caseList , tab } = this.state;
    let num = 0;
    let length = caseList.length;
    caseList.map((item,index)=>{
      if(item_id === item.item_id){
        num = index;
      }
      return item;
    });
    if((num+1) < length){
      num++;
    }else{
      num=0;
    }
    this.setState({
      item_id: caseList[num].item_id,
      caseTitle: caseList[num].item_name,
      nextTitle: caseList[num+1 >= length ? 0 : num+1].item_name,
    });
    if(tab === 'professional'){
      this.professional(goods_id, inspector_id, caseList[num].item_id, bind_id)
    }else if(tab === 'imageText'){
      this.imageText(goods_id, inspector_id, caseList[num].item_id, bind_id)
    }
    window.scrollTo(0,0);
  }
  handleVisibleChange = (visible) => {
    this.setState({
      visible,
    });
  }
  render() {
    const { tab, shareStatus, caseList, imageText, caseTitle, submitting, item_status, height } = this.state;
    const caseListArray = [];
    caseList.map( ( item, index) => {
      caseListArray.push((<Item key={index} name={item.item_name} value={item.item_id}>{item.item_name}</Item>))
    });

    const imageTextList = imageText !== null ? imageText.list.map(( item, index )=>{
      return <li className="r-d-s-t-tr" key={index}>
        <span>{item.chromosome}</span>
        <span>{item.gene_name}</span>
        <span>{item.locus}</span>
        <span>{item.gene_type}</span>
      </li>;
    }) : '';

    return (
      <div className="report-share">
        <div className='header'>{caseTitle}</div>
        <div className="report-detail-imageText" style={{display:(item_status === 1 && submitting ?'block':'none')}}>
          <div className="report-detail-content" style={{paddingBottom:0}} ref='ShareImg'>
            <div className="report-detail-show">
              <img src={imageText !== null ? imageText.img_result : ''} className="report-detail-img"/>
              <ul className="report-detail-show-table">
                <li className="r-d-s-t-header">
                  <span>染色体</span>
                  <span>基因</span>
                  <span>位点</span>
                  <span>基因型</span>
                </li>
                {imageTextList}
              </ul>
            </div>
            <div className="report-detail-QRcode" style={{display:(shareStatus?'block':'block')}}></div>
          </div>
        </div>
        <div className="result-content result-fail" style={{display:(item_status === 0 && submitting ?'block':'none'),height:document.documentElement.clientHeight-height-20}}>
          <div>
            <p>
              因DNA浓度过低，本项目检测失败...稍后客<br/>服会联系您，请先浏览其他项目报告。
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default createForm()(translate()(connect(() => ({
}), dispatch => ({
  actions: {
    goodsItem: bindActionCreators(goodsItem, dispatch),
    professional: bindActionCreators(professional, dispatch),
    imageText: bindActionCreators(imageText, dispatch),
    isLogin: bindActionCreators(isLogin, dispatch),
    saveBase64Img: bindActionCreators(saveBase64Img, dispatch),
  },
}))(toJS(ReportShare))));
