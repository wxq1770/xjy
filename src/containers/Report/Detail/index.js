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
  saveBase64Img,
} from './actions';

import {
  isLogin,
} from '../../App/actions';

import './index.less';

const Item = Popover.Item;

class ReportDetail extends PureComponent {
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
      is_login: false,
      show: '',
      item_id: '',
      caseTitle:'报告',
      item_status: 1,
      tab: 'professional',
      shareStatus: false,
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
    const { actions } = this.props;
    const { inspector_id , goods_id } = this.state;
    try {
      const { value: { status, msg, data }} = await actions.isLogin({
        body: {},
      });
      if(data.is_login !== 1){
        this.setState({
          show: 'demo',
          is_login: false,
          height: parseInt(this.refs.navBar.offsetHeight),
        });
      }else{
        if(inspector_id|| goods_id){
          this.goodsItem();
          this.setState({
            show: 'detail',
            is_login: true,
            height: parseInt(this.refs.navBar.offsetHeight),
          });
        }else{
          this.setState({
            show: 'demo',
            is_login: true,
            height: parseInt(this.refs.navBar.offsetHeight),
          });
        }
      }
    } catch (error) {
      // 处理登录错误
      throw error;
    }
  }
  goodsItem = async () => {
    const { actions } = this.props;
    const { goods_id, inspector_id, bind_id } = this.state;
    const { tab } = this.state;
    try {
      const { value: { status, msg, data }} = await actions.goodsItem({
        body: {
          goods_id: this.state.goods_id,
        },
      });
      this.setState({
        show: 'list',
        caseTitle: data.list[0].item_name,
        item_id: data.list[0].item_id,
        caseList: data.list,
        nextTitle: data.list[(data.list.length > 1 ? 1 : 0)].item_name,
      });

      if(tab === 'professional'){
        this.professional(goods_id, inspector_id, data.list[0].item_id, bind_id);
      }else if(tab === 'imageText'){
        this.imageText(goods_id, inspector_id, data.list[0].item_id, bind_id);
      }
    } catch (error) {
      // 处理登录错误
      throw error;
    }
  }
  professional = async (goods_id, inspector_id, item_id, bind_id) => {
    const { actions } = this.props;
    try {
      const { value: { status, msg, data }} = await actions.professional({
        body: {
          goods_id: goods_id,
          item_id : item_id,
          bind_id: 9,
        },
      });
      this.setState({
        submitting:true,
        item_status: data.item_status === 1 ? 1 : 2,
        professional: data,
      });
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
          //inspector_id: inspector_id,
          item_id : item_id,
          bind_id: 9,
        },
      });
      this.setState({
        item_status: data.item_status === 1 ? 1 : 2,
        imageText: data,
      });
    } catch (error) {
      // 处理登录错误
      throw error;
    }
  }
  tab = (cur) => {
    this.setState({
      tab : cur,
    });
    const {goods_id, inspector_id, item_id, bind_id} = this.state;
    if(cur === 'professional'){
      this.professional(goods_id, inspector_id, item_id, bind_id);
    }else if(cur === 'imageText'){
      this.imageText(goods_id, inspector_id, item_id, bind_id);
    }
  }
  savePng = async () => {
    const { actions } = this.props;
    this.setState({
      shareStatus : true,
    });
    var node = this.refs.ShareImg;
    domtoimage.toPng(node)
    .then((dataUrl) =>{
        var img = new Image();
        img.src = dataUrl;
        img.style.width = '90%';
        img.style.display = 'block';
        img.style.margin = '0 auto';
        document.body.appendChild(img);
        this.setState({
          shareStatus : false,
        });
    })
    .catch((error) => {
        html2canvas(node, {
            useCORS: true,
        }).then((canvas)=> {
          try {
            var img = new Image();
            img.src = canvas.toDataURL("image/png");
            img.style.width = '90%';
            img.style.display = 'block';
            img.style.margin = '0 auto';
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
    const { goods_id } = this.state;
    if(goods_id){
      this.props.router.push('/buy/null/'+goods_id);
    }else{
      this.props.router.push('/buy/');
    }
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
      this.professional(goods_id, inspector_id, opt.props.value, bind_id)
    }else if(tab === 'imageText'){
      this.imageText(goods_id, inspector_id, opt.props.value, bind_id)
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
  }
  handleVisibleChange = (visible) => {
    this.setState({
      visible,
    });
  }
  render() {
    const { tab, shareStatus, caseList, visible, caseTitle, nextTitle, professional, imageText, submitting, item_status, height} = this.state;
    const caseListArray = [];
    caseList.map( ( item, index) => {
      caseListArray.push((<Item key={index} name={item.item_name} value={item.item_id}>{item.item_name}</Item>))
    });

    const imageTextList = imageText.list.map((item,index)=>{
      return <li className="r-d-s-t-tr" key={index}>
        <span>{item.chromosome}</span>
        <span>{item.gene_name}</span>
        <span>{item.locus}</span>
        <span>{item.gene_type}</span>
      </li>;
    });

    const professionalList = professional.list.map((item,index)=>{
      return <li className="r-d-s-t-tr" key={index}>
        <span style={{width:'15%'}}>{item.chromosome}</span>
        <span style={{width:'15%'}}>{item.gene_name}</span>
        <span style={{width:'20%'}}>{item.locus}</span>
        <span style={{width:'15%'}}>{item.gene_type}</span>
        <span style={{width:'35%'}}>{item.result}</span>
      </li>;
    });
    
    return (
      <div className="report-detail">
        <div ref='navBar'>
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
          <div className="report-detail-tab" ref='tab'>
            <span className={tab === 'professional' ? 'cur' : ''} onClick={this.tab.bind(this,'professional')}>专业解读版本</span>
            <span className={tab === 'imageText' ? 'cur' : ''} onClick={this.tab.bind(this,'imageText')}>图文分享版</span>
          </div>
        </div>
        <div className="report-detail-imageText" style={{display:(tab==='imageText' && item_status === 1  && submitting ?'block':'none')}}>
          <div className="report-detail-content" ref='ShareImg'>
            <div className="report-detail-show">
              <img src={imageText.img_result} className="report-detail-img" style={{display:(submitting ? 'block' : 'none')}}/>
              <ul className="report-detail-show-table" style={{display:(submitting ? 'block' : 'none')}}>
                <li className="r-d-s-t-header">
                  <span>染色体</span>
                  <span>基因</span>
                  <span>位点</span>
                  <span>基因型</span>
                </li>
                {imageTextList}
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
        <div className="report-detail-professional" style={{display:(tab==='professional' && item_status === 1 && submitting ?'block':'none')}}>
          <div className="report-detail-professional-warp">
            <div className="report-detail-professional-warp-title">
              <span className="r-d-p-w-t-icon r-d-p-w-t-icon-1"></span>
              <span className="r-d-p-w-t-txt">你的基因检测结果</span>
            </div>
            <div className="report-detail-professional-warp-content">
              <h2 className="r-d-p-w-c-title" style={{display:(submitting ? 'block' : 'none')}}>{professional.check_result}</h2>
              <p>{professional.explain_result}</p>
              <ul className="report-detail-show-table" style={{display:(submitting ? 'block' : 'none')}}>
                <li className="r-d-s-t-header">
                  <span style={{width:'15%'}}>染色体</span>
                  <span style={{width:'15%'}}>基因</span>
                  <span style={{width:'20%'}}>位点</span>
                  <span style={{width:'15%'}}>基因型</span>
                  <span style={{width:'35%'}}>结果</span>
                </li>
                {professionalList}
              </ul>
            </div>
          </div>
          <div className="report-detail-professional-warp">
            <div className="report-detail-professional-warp-title">
              <span className="r-d-p-w-t-icon r-d-p-w-t-icon-2"></span>
              <span className="r-d-p-w-t-txt">解密基因型</span>
            </div>
            <div className="report-detail-professional-warp-content">
              <p>{professional.decode_gene}</p>
            </div>
          </div>
          <div className="report-detail-professional-warp">
            <div className="report-detail-professional-warp-title">
              <span className="r-d-p-w-t-icon r-d-p-w-t-icon-3"></span>
              <span className="r-d-p-w-t-txt">小基因建议</span>
            </div>
            <div className="report-detail-professional-warp-content">
              <p>{professional.suggest}</p>
            </div>
          </div>
          <div className="report-detail-professional-warp">
            <div className="report-detail-professional-warp-title">
              <span className="r-d-p-w-t-icon r-d-p-w-t-icon-4"></span>
              <span className="r-d-p-w-t-txt">你知道吗?</span>
            </div>
            <div className="report-detail-professional-warp-content">
              <p>{professional.knowledge}</p>
            </div>
          </div>
          <div className="report-detail-share">
            <span style={{width:'5.4rem'}} onClick={this.next}>下一项：{nextTitle}</span>
          </div>
          <div className="footer">
            <p>【原价99元，限时优惠只需59元】</p>
            <span onClick={this.buy}>立即购买</span>
          </div>
        </div>
        <div className="result-content result-fail" style={{display:(item_status !== 1 && submitting ?'block':'none'),height:document.documentElement.clientHeight-height-20}}>
          <div>
            <p>
              因DNA浓度过低，本项目检测失败...稍后客<br/>服会联系您，请先浏览其他项目报告。
            </p>
          </div>
          <div className="report-detail-share report-detail-share-result">
            <span style={{width:'5.4rem'}} onClick={this.next}>下一项：{nextTitle}</span>
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
}))(toJS(ReportDetail))));
