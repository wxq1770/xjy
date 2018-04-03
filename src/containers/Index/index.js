import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { bindActionCreators } from 'redux';
import React, { PureComponent } from 'react';

import TabBarItem from '../../components/TabBarItem';
import toJS from '../../libs/toJS';

import {
  isLogin,
} from '../App/actions';

import {
  orderList,
} from '../User/Order/actions';

import {
  focusStatus,
  subscribe,
  isSubscribe,
} from './actions';

import './index.less';


class Index extends PureComponent {

  constructor(props) {
    window.history.replaceState({},
      document.title,
      window.location.pathname + window.location.hash,
    );
    super(props);
    this.state = {
      focusStatus: false,
      is_login: true,
      is_binded:0,
      is_order:0,
    };
  }

  componentDidMount = async () => {
    const { actions } = this.props;
    try {
      const { value: { status, msg, data }} = await actions.isLogin({
        body: {},
      });
      if(status === 1 && data.is_login === 1){
        this.setState({
          is_login: true,
        });
      }else{
        this.setState({
          is_login: false,
        });
      }
    } catch (error) {
      // 处理登录错误
      throw error;
    }
    this.orderList();
  }
  componentDidUpdate = async () => {
    const { actions } = this.props;
    try {
      const { value: { status, msg, data }} = await actions.isSubscribe({
        body: {
          goods_id:1,
        },
      });
      if(status === 1009){
        this.setState({
          is_login: false,
          is_binded: 0,
        });
      }else if(status === 1 && data.is_subscribe === 1){
        this.setState({
          is_login: true,
          is_binded: 1,
        });
      }
    } catch (error) {
      // 处理登录错误
      throw error;
    }
  }
  orderList  = async () => {
    const { actions } = this.props;
    const { relationArr } = this.state;
    const { value: {status, msg, data }} = await actions.orderList({
      body: {},
    });
    this.setState({
      is_order : status === 1 && data.list.length > 0 ? 1 : 0,
    });
  }
  renderContent = page => {
    this.props.router.push(page);
  }
  link = url => {
    this.props.router.push(url);
  }
  go = url =>{
    window.location.href= url;
  }
  focus = async () => {
    if(this.props.focusStatus){
      return false;
    }
    const { actions } = this.props;
    try {
      const { value: { status, msg, data }} = await actions.subscribe({
        body: {
          goods_id: 1,
        },
      });
      if(status === 1){
        actions.focusStatus(true);
        this.setState({
          is_binded: 1,
        });
      }else{
        actions.focusStatus(false);
        this.setState({
          is_binded: 0,
        });
      }
    } catch (error) {
      // 处理登录错误
      throw error;
    }
  }
  render() {
    const { is_login, is_binded, is_order } = this.state;
    return (
      <div className="index">
        <span className="index-login" style={{display:(is_login ? 'none' : 'block')}}><span onClick={this.link.bind(this,'/register')}>注册</span> / <span onClick={this.link.bind(this,'/login')}>登录</span></span>
        <div className="header">
          <div className="header-content">
            <h4>
              小基因，第一次测的基因
            </h4>
            <p>
              科学并不遥远，就在我们身边
            </p>
          </div>
          <div className="header-item">
           <div className="header-item-bj"></div>
            <div className="header-item-content">
              <span className="header-item-1" onClick={this.link.bind(this,'/guide')}>新手必看</span>
              <span className="header-item-2" onClick={this.link.bind(this,'/event/sale')}>优惠活动</span>
              <span className="header-item-3" onClick={this.link.bind(this,'/report/index')}>示例报告</span>
            </div>
          </div>
        </div>
        <div className="banner" onClick={this.link.bind(this,'/details')}>
          <div></div>
        </div>

        <div className="indexfocus"  style={{display:( is_order && is_login ? 'block' : 'none' )}}>
          <p className="indexfocus-titile"><strong>【我们的习惯】</strong>等你解锁</p>
          <p>从个人基因角度探索喝咖啡、喝牛奶<br/>、吸烟、睡眠对你的影响</p>
          <p>关注人数过千即可成功解锁</p>
          <div className={ this.props.focusStatus || is_binded ? "shulv" : "shuhui"}></div>
          <span className="focus-btn" onClick={this.focus}>{ this.props.focusStatus || is_binded ? "已关注" : "点击关注"}</span>
        </div>
        
        <div className="list">
          <div className="list-item clearfix" onClick={this.go.bind(this,'http://mp.weixin.qq.com/s/zaRUCSvD4eJz8KaSv19dsg')} >
            <img src="/assets/img/index_3.png" className="list-item-img" />
            <div className="list-item-warp ">
              <span className="list-item-warp-title">揭秘：实力酷炫的小基因！</span>
              <span className="list-item-warp-content">
                注意：小基因来了...
              </span>
            </div>
          </div>
          <div className="list-item clearfix" onClick={this.go.bind(this,'http://mp.weixin.qq.com/s/XELWrLB5WKeegj-5Yeg2nw')} >
            <img src="/assets/img/index_1.png" className="list-item-img" />
            <div className="list-item-warp ">
              <span className="list-item-warp-title">基因检测的科学原理是什么？</span>
              <span className="list-item-warp-content">
                让你秒懂基因、DNA和染色体的关系...
              </span>
            </div>
          </div>
          <div className="list-item clearfix" onClick={this.go.bind(this,'http://mp.weixin.qq.com/s/LlHjNCEMASigCCM51c-qgA')} >
            <img src="/assets/img/index_2.png" className="list-item-img" />
            <div className="list-item-warp ">
              <span className="list-item-warp-title">刮刮口腔就能检测基因？</span>
              <span className="list-item-warp-content">
                测出你的基因型，科学从未如此性感...
              </span>
            </div>
          </div>
          <div className="list-item clearfix" onClick={this.go.bind(this,'http://mp.weixin.qq.com/s/wsTOxhp6YV1N6PzgJy4kPA')} >
            <img src="/assets/img/index_4.png" className="list-item-img" />
            <div className="list-item-warp ">
              <span className="list-item-warp-title">一份基因检测报告的出炉过程！</span>
              <span className="list-item-warp-content">
                恐怕，这是你花钱最值得的一次...
              </span>
            </div>
          </div>
        </div>
        <div className="footer">
          <p>
            <span>minigene.net</span><i>|</i>京ICP备18000963号 -1
          </p>
          <p>
            <span onClick={this.renderContent.bind(this,'/contactus')} style={{color:'#2ABEC4'}}>联系我们</span><i>|</i>客服电话：<a href="tel:4006001886">400-600-1886</a>
          </p>
        </div>
      </div>
    );
  }
}

export default translate()(connect((state, ownProps) => ({
  focusStatus : state.getIn(['indexReducer', 'focusStatus']),
}), dispatch => ({
  actions: {
    focusStatus: bindActionCreators(focusStatus, dispatch),
    isLogin: bindActionCreators(isLogin, dispatch),
    orderList: bindActionCreators(orderList, dispatch),
    subscribe: bindActionCreators(subscribe, dispatch),
    isSubscribe: bindActionCreators(isSubscribe, dispatch),
  },
}))(toJS(Index)));
