import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { bindActionCreators } from 'redux';
import React, { PureComponent } from 'react';
import { NavBar, Icon,Popover } from 'antd-mobile';
import { createForm } from 'rc-form';
import domtoimage from 'dom-to-image';
import html2canvas from 'html2canvas';
import TabBarItem from '../../../components/TabBarItem';
import BuyAccount from '../../../components/BuyAccount';

import toJS from '../../../libs/toJS';

import {
  goodsItem,
  professional,
  imageText,
} from './actions';

import {
  isLogin,
} from '../../App/actions';

import './index.less';

const Item = Popover.Item;

class ReportDemo extends PureComponent {
  constructor(props) {
    window.history.replaceState({},
      document.title,
      window.location.pathname + window.location.hash,
    );
    super(props);
    this.state = {
      inspector_id: parseInt(this.props.params.inspector_id ? this.props.params.inspector_id : ''),
      goods_id: parseInt(this.props.params.goods_id ? this.props.params.goods_id : ''),
      bind_id: parseInt(this.props.params.bind_id ? this.props.params.bind_id : ''),
      is_login: false,
      show: '',
      item_id: 1,
      tab: 'professional',
      shareStatus: false,
      visible: false,
      caseList: [
        { item_id: 1, item_name: "酒精代谢能力" },
        { item_id: 2, item_name: "抗压能力" },
        { item_id: 3, item_name: "探索冒险精神" },
        { item_id: 4, item_name: "长寿可能性" },
      ],
      caseTitle: '酒精代谢能力',
      nextTitle: '抗压能力',
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
    };
  }
  componentDidMount() {
  }
  tab = (cur) => {
    this.setState({
      tab : cur,
    });
  }
  savePng = () => {
    this.setState({
      shareStatus : true,
    });
    var node = this.refs.ShareImg;
    domtoimage.toPng(node)
    .then((dataUrl) =>{
        var img = new Image();
        img.src = dataUrl;
        
        document.body.appendChild(img);
        this.setState({
          shareStatus : false,
        });
    })
    .catch((error) => {
        html2canvas(node, {
            useCORS: true  
        }).then((canvas)=> {
          try {
            var img = new Image();
            img.src = canvas.toDataURL("image/png");
            document.body.appendChild(img);
            this.setState({
              shareStatus : false,
            });
          } catch (err) {
             this.setState({
                shareStatus : false,
             });
          }
        }).catch(function onRejected(error) {});
    });
  }
  buy = ()=>{
    this.props.router.push('/buy');
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
  }
  handleVisibleChange = (visible) => {
    this.setState({
      visible,
    });
  }
  render() {
    const { tab, shareStatus, caseList, visible, caseTitle, nextTitle, professional, imageText} = this.state;
    const caseListArray = [];
    caseList.map( ( item, index) => {
      caseListArray.push((<Item key={index} name={item.item_name} value={item.item_id}>{item.item_name}</Item>))
    });

    return (
      <div className="report-detail">
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => window.history.go(-1)}
        >
        <Popover
            overlayClassName="popover-title"
            visible={visible}
            overlay={caseListArray}
            onSelect={this.onSelect}
            onVisibleChange={this.handleVisibleChange}
            align={{
              overflow: { adjustY: 1, adjustX: 1 },
              offset: ['0%', 8],
            }}
          >
            <span className="title-sanjiao">{caseTitle}<em></em><span></span></span>
          </Popover>
        </NavBar>
        <div className="report-detail-tab">
          <span className={tab === 'professional' ? 'cur' : ''} onClick={this.tab.bind(this,'professional')}>专业解读版本</span>
          <span className={tab === 'imageText' ? 'cur' : ''} onClick={this.tab.bind(this,'imageText')}>图文分享版</span>
        </div>
        <div className="report-detail-imageText" style={{display:(tab==='imageText'?'block':'none')}}>
          <div className="report-detail-content" ref='ShareImg'>
            <div className="report-detail-show">
              <img src={imageText.img_result} className="report-detail-img" />
              <ul className="report-detail-show-table">
                <li className="r-d-s-t-header">
                  <span>染色体</span>
                  <span>基因</span>
                  <span>位点</span>
                  <span>基因型</span>
                </li>
                <li className="r-d-s-t-tr">
                  <span>13号</span>
                  <span>ADH1B</span>
                  <span>rs1229984</span>
                  <span>AG</span>
                </li>
                <li className="r-d-s-t-tr">
                  <span>13号</span>
                  <span>ADH1B</span>
                  <span>rs1229984</span>
                  <span>AG</span>
                </li>
              </ul>
            </div>
            <div className="report-detail-QRcode" style={{display:(shareStatus?'block':'none')}}></div>
          </div>
          <div className="report-detail-share">
            <span onClick={this.savePng}>生成图片分享</span>
            <span onClick={this.next}>下一项：{nextTitle}</span>
          </div>
          <div className="footer">
            <p>【原价99元，限时优惠只需59元】</p>
            <span onClick={this.buy}>立即购买</span>
          </div>
        </div>
        <div className="report-detail-professional" style={{display:(tab==='professional'?'block':'none')}}>
          <div className="report-detail-professional-warp">
            <div className="report-detail-professional-warp-title">
              <span className="r-d-p-w-t-icon r-d-p-w-t-icon-1"></span>
              <span className="r-d-p-w-t-txt">你的基因检测结果</span>
            </div>
            <div className="report-detail-professional-warp-content">
              <h2 className="r-d-p-w-c-title">酒精代谢能力好，很能喝酒</h2>
              <p>乙醇、乙醛代谢均快：酒量好，但不能喝的太急，可能会因乙醇代谢超过了乙醛代谢速度而造成乙醛在体内堆积，导致较容易脸红（“上脸”）。</p>
              <ul className="report-detail-show-table">
                <li className="r-d-s-t-header">
                  <span>染色体</span>
                  <span>基因</span>
                  <span>位点</span>
                  <span>基因型</span>
                  <span>结果</span>
                </li>
                <li className="r-d-s-t-tr">
                  <span>13号</span>
                  <span>ADH1B</span>
                  <span>rs1229984</span>
                  <span>AG</span>
                  <span>乙醇代谢较快</span>
                </li>
                <li className="r-d-s-t-tr">
                  <span>13号</span>
                  <span>ADH1B</span>
                  <span>rs1229984</span>
                  <span>AG</span>
                  <span>乙醇代谢较快</span>
                </li>
              </ul>
              <p className="error">示例报告以下仅展示部分内容，购买检测后会生成自己的完整报告哦！</p>
            </div>
          </div>
          <div className="report-detail-professional-warp">
            <div className="report-detail-professional-warp-title">
              <span className="r-d-p-w-t-icon r-d-p-w-t-icon-2"></span>
              <span className="r-d-p-w-t-txt">解密基因型</span>
            </div>
            <div className="report-detail-professional-warp-content">
              <p>酒精，学名乙醇，在身体内的代谢分解，有超过90%的部分通过肝脏进行，这个代谢分解过程简单来说...</p>
            </div>
          </div>
          <div className="report-detail-professional-warp">
            <div className="report-detail-professional-warp-title">
              <span className="r-d-p-w-t-icon r-d-p-w-t-icon-3"></span>
              <span className="r-d-p-w-t-txt">小基因建议</span>
            </div>
            <div className="report-detail-professional-warp-content">
              <p>根据中国营养学会对健康饮酒的建议：成年男性一天饮用的酒精量不超过25g，成年女性则不超过15g...</p>
            </div>
          </div>
          <div className="report-detail-professional-warp">
            <div className="report-detail-professional-warp-title">
              <span className="r-d-p-w-t-icon r-d-p-w-t-icon-4"></span>
              <span className="r-d-p-w-t-txt">你知道吗?</span>
            </div>
            <div className="report-detail-professional-warp-content">
              <p>1、为什么有人喝酒会上脸？喝酒会上脸，其实是一种进化优势！影响乙醛代谢酶活性的ALDH基因上位...</p>
            </div>
          </div>
          <div className="report-detail-share">
            <span style={{width:'5.4rem'}} onClick={this.next.bind(this,9)}>下一项：{nextTitle}</span>
          </div>
          <div className="footer">
            <p>【原价99元，限时优惠只需59元】</p>
            <span onClick={this.buy}>立即购买</span>
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
  },
}))(toJS(ReportDemo))));
