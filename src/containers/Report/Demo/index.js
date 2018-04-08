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
      shareImg: '',
      inspector_id: parseInt(this.props.params.inspector_id ? this.props.params.inspector_id : ''),
      goods_id: parseInt(this.props.params.goods_id ? this.props.params.goods_id : ''),
      bind_id: parseInt(this.props.params.bind_id ? this.props.params.bind_id : ''),
      is_login: false,
      show: '',
      item_id: 1,
      tab: 'professional',
      shareStatus: false,
      showImgStatus: false,
      visible: false,
      caseList: [
        {
          item_id: 1,
          item_name: "酒精代谢能力",
          imageText: {
            list: [{
              chromosome: '染色体',
              gene_name: '基因',
              locus: '位点',
              gene_type: '基因型',
            },{
              chromosome: '染色体',
              gene_name: '基因',
              locus: '位点',
              gene_type: '基因型',
            }],
            img_result: 'http://www.minigene.net/assets/img/jiujingqiang.png?a=2',
          },
          professional: {
            list: [{
              chromosome: '4',
              gene_name: 'ADH1B',
              locus: 'rs1229984',
              gene_type: 'AA',
              result: '乙醇代谢快',
            },{
              chromosome: '12',
              gene_name: 'ALDH2',
              locus: 'rs671',
              gene_type: 'GG',
              result: '乙醛代谢快',
            }],
            check_result: '你的酒精代谢能力：强',
            explain_result: '乙醇、乙醛代谢均快：酒量好，但不能喝的太急，可能会因乙醇代谢超过了乙醛代谢速度而造成乙醛在体内堆积，导致较容易脸红（“上脸”）。',
            decode_result: '酒精，学名乙醇，在身体内的代谢分解，有超过90%的部分通过肝脏进行，这个代谢分解过程简单来说就是：乙醇代谢酶先把乙醇氧化成乙醛，乙醛代谢酶…',
            suggest: '根据中国营养学会对健康饮酒的建议：成年男性一天饮用的酒精量不超过25g，成年女性则不超过15g。小基因通过对检测结果大数据的分析给出建议…',
            knowledge: '1、为什么有人喝酒会上脸？<br/>喝酒会上脸，其实是一种进化优势！影响乙醛代谢酶活性的ALDH基因上位点的突变，主要分布在亚洲人中，该位点的突变会导致喝酒容易上脸。而这种“上脸” …',
          },
        }, {
          item_id: 2,
          item_name: "抗压能力",
          imageText: {
            list: [{
              chromosome: '染色体',
              gene_name: '基因',
              locus: '位点',
              gene_type: '基因型',
            }],
            img_result: 'http://www.minigene.net/assets/img/kangyaqiang.png?a=2',
          },
          professional: {
            list: [{
              chromosome: '22',
              gene_name: 'COMT',
              locus: 'rs4680',
              gene_type: 'GG',
              result: '抗压能力强',
            }],
            check_result: '你的抗压能力：强 ',
            explain_result: '',
            decode_result: '检测22号染色体上的COMT基因，是因为该基因编码一种叫做“儿茶酚氧位甲基转移酶”的COMT酶，这种酶影响多巴胺的代谢。多巴胺是大脑分泌物…',
            suggest: '无论先天抗压能力强弱，也都会有遇到压力而焦虑紧张痛苦的时候，虽然我们常说“压力是前进的动力”，但科学适当地减压，有时更容易事半功倍。日常解压…',
            knowledge: '1、女性为什么更情绪化？<br/>有研究表明，雌激素会降低COMT酶的活性，当面对争吵时，多巴胺会升高到超出最佳值，过高的多巴胺水平会使女性对压力更敏感，表现的更加情绪化…',
          },
        }, {
          item_id: 3,
          item_name: "探索冒险精神",
          imageText: {
            list: [{
              chromosome: '染色体',
              gene_name: '基因',
              locus: '位点',
              gene_type: '基因型',
            }],
            img_result: 'http://www.minigene.net/assets/img/tansuoqiang.png?a=2',
          },
          professional: {
            list: [{
              chromosome: '11',
              gene_name: 'DRD4',
              locus: 'rs1800955',
              gene_type: 'TT',
              result: '探索冒险精神一般',
            }],
            check_result: '你的探索冒险精神：一般',
            explain_result: '',
            decode_result: '检测11号染色体上的DRD4基因，是因为该基因编码多巴胺D4受体蛋白，而多巴胺D4受体蛋白则会影响人们对新鲜事物的好奇心与对未知领域的探索…',
            suggest: '你对冒险探索的欲望一般，对尝试新鲜事物持保守态度，多数情况下能冷静沉着，思维严谨保守，恬淡寡欲，为人处世偏谨慎理智。虽也不喜欢，但对重复性强…',
            knowledge: '真有“发现基因”这种基因么？<br/>科学家发现，部分人身上有一种叫做DRD4-7R的基因变体，这种变体有助于控制人脑多巴胺，令人们更爱冒险更爱去新的地方探索。这个基因位于11号…',
          },
        }, {
          item_id: 4,
          item_name: "长寿可能性",
          imageText: {
            list: [{
              chromosome: '染色体',
              gene_name: '基因',
              locus: '位点',
              gene_type: '基因型',
            }],
            img_result: 'http://www.minigene.net/assets/img/changshouqiang.png?a=2',
          },
          professional: {
            list: [{
              chromosome: '19',
              gene_name: 'APOE',
              locus: 'rs429358',
              gene_type: 'TC',
              result: '长寿可能性较高',
            }],
            check_result: '90岁以上可能性：较高',
            explain_result: '',
            decode_result: '检测19号染色体上的APOE基因，是因为它负责编码人体内一种在脂质和脂蛋白代谢中起重要作用的血浆蛋白：载脂蛋白E。它主要分三种类型：ε2…',
            suggest: '请注意：长寿基因只是与先天的长寿可能性相关，但它并非直接决定了我们的实际寿命。人们后天的生活习惯、生活环境等都在很大程度上影响了我们的寿命…',
            knowledge: '1、长寿基因是怎么被发现的？<br/>研究人员比较了来自意大利、西班牙和日本的971位百岁老人与2134位年纪较小者的基因组成，结果发现：基因呈现ε4类型时对长寿有了负面影响…',
          },
        }],
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
    this.setState({
      imageText: this.state.caseList[0].imageText,
      professional: this.state.caseList[0].professional,
    });
  }
  tab = (cur) => {
    const pathname = this.props.location.pathname+this.props.location.search;
    const newUrl = "http://www.minigene.net/#"+(pathname);
    window.wx.onMenuShareTimeline({
      title: '来自基因的小秘密，你也得看看', 
      link: newUrl, 
      imgUrl: 'http://www.minigene.net/assets/img/logo2.png', 
      success: function () {},
      cancel: function () {},
    });

    window.wx.onMenuShareAppMessage({
      title: '来自基因的小秘密，你也得看看', 
      desc: '', 
      link: newUrl, 
      imgUrl: 'http://www.minigene.net/assets/img/logo2.png', 
      type: 'link', // 分享类型,music、video或link，不填默认为link
      dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      success: function () {},
      cancel: function () {},
    });

    window.wx.onMenuShareQQ({
      title: '来自基因的小秘密，你也得看看', 
      desc: '', 
      link: newUrl, // 分享链接
      imgUrl: 'http://www.minigene.net/assets/img/logo2.png', 
      success: function () {},
      cancel: function () {},
    });

    window.wx.onMenuShareWeibo({
      title: '来自基因的小秘密，你也得看看', 
      desc: '', 
      link: newUrl, // 分享链接
      imgUrl: 'http://www.minigene.net/assets/img/logo2.png', 
      success: function () {},
      cancel: function () {},
    });

    window.wx.onMenuShareQZone({
      title: '来自基因的小秘密，你也得看看', 
      desc: '', 
      link: newUrl, // 分享链接
      imgUrl: 'http://www.minigene.net/assets/img/logo2.png', 
      success: function () {},
      cancel: function () {},
    });
    this.setState({
      tab : cur,
    });
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
      margin : 0,
      background: '#2ABEC4',
      paddingBottom:"0",
    });
    window.scrollTo(0,0);
    let w = 320;
    let h = 600;
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
  buy = ()=>{
    window.scrollTo(0,0);
    this.props.router.push('/buyproduct');
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
      imageText: this.state.caseList[num].imageText,
      professional: this.state.caseList[num].professional,
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
      imageText: this.state.caseList[num].imageText,
      professional: this.state.caseList[num].professional,
      item_id: caseList[num].item_id,
      caseTitle: caseList[num].item_name,
      nextTitle: caseList[num+1 >= length ? 0 : num+1].item_name,
    });
    window.scrollTo(0,0);
  }
  handleVisibleChange = (visible) => {
    this.setState({
      visible,
    });
  }
  closeImg=()=>{
    this.setState({
      showImgStatus : false,
    })
  }
  render() {
    const { tab, shareStatus, showImgStatus, caseList, visible, caseTitle, nextTitle, professional, imageText, submitting, item_status, height, shareImg} = this.state;
    const caseListArray = [];
    caseList.map( ( item, index) => {
      caseListArray.push((<Item key={index} name={item.item_name} value={item.item_id}>{item.item_name}</Item>))
    });

    const professionalList = professional.list.map((item,index)=>{
      return <li className="r-d-s-t-tr" key={index}>
        <span style={{width:'12%'}}>{item.chromosome}</span>
        <span style={{width:'20%'}}>{item.gene_name}</span>
        <span style={{width:'20%'}}>{item.locus}</span>
        <span style={{width:'18%'}}>{item.gene_type}</span>
        <span style={{width:'30%'}}>{item.result}</span>
      </li>;
    });

    const imgList = professional.list.map((item,index)=>{
      return <li className="r-d-s-t-tr" key={index}>
        <span >{item.chromosome}</span>
        <span >{item.gene_name}</span>
        <span >{item.locus}</span>
        <span >{item.gene_type}</span>
      </li>;
    });

    return (
      <div className="report-detail">

        <div className="share-img" style={{ display: (showImgStatus ? 'block' : 'none')}}>
          <div className="share-img-bj"></div>
          <div className="share-img-url" ref="shareImg"></div>
          <div className="share-img-txt">长按保存图片到相册，可发送朋友或分享朋友圈</div>
          <Icon type="cross" onClick={this.closeImg} />
        </div>
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
          <span className={tab === 'professional' ? 'cur' : ''} onClick={this.tab.bind(this,'professional')}>专业解读版</span>
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
                {imgList}
              </ul>
            </div>
            <div className="report-detail-QRcode" style={{display:(shareStatus?'block':'none')}}></div>
          </div>
          <div className="report-detail-share">
            <span onClick={this.savePng}>生成图片分享</span>
            <span onClick={this.next}>下一项：{nextTitle}</span>
          </div>
          <div className="footer">
            <p>【原价99元，首发优惠只需59元】</p>
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
              <h2 className="r-d-p-w-c-title">{professional.check_result}</h2>
              <p>{professional.explain_result}</p>
              <ul className="report-detail-show-table">
                <li className="r-d-s-t-header">
                  <span style={{width:'12%'}}>染色体</span>
                  <span style={{width:'20%'}}>基因</span>
                  <span style={{width:'20%'}}>位点</span>
                  <span style={{width:'18%'}}>基因型</span>
                  <span style={{width:'30%'}}>结果</span>
                </li>
                {professionalList}
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
              <p>{professional.decode_result}</p>
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
              <p dangerouslySetInnerHTML={{__html: professional.knowledge}}></p>
            </div>
          </div>
          <div className="report-detail-share">
            <span style={{width:'5.4rem'}} onClick={this.next.bind(this,9)}>下一项：{nextTitle}</span>
          </div>
          <div className="footer">
            <p>【原价99元，首发优惠只需59元】</p>
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
