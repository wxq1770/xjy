import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { NavBar, Icon, Checkbox, Popover, ActionSheet,Picker, List, DatePicker, Radio, TabBar} from 'antd-mobile';

// import { bindActionCreators } from 'redux';
import React, { PureComponent } from 'react';

import toJS from '../../libs/toJS';

import './index.less';

const relation = [{
  value: 'zj-nb',
  label: '父母',
}, {
  value: 'zj-hz',
  label: '子女',
}]

class Index extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
  }

  constructor(props) {
    window.history.replaceState({},
      document.title,
      window.location.pathname + window.location.hash,
    );
    super(props);
    let locale = localStorage.getItem('locale');
    if (!locale) {
      locale = 'zh-CN';
      localStorage.setItem('locale', locale);
    }
    this.state = {
      locale,
      sValue:'',
      date:'',
    };
  }

  componentDidMount() {
    if (navigator.platform.indexOf('Win') > -1) {
      document.body.classList.add('windows');
    }
  }

  scanQRCode = ()=>{
    window.wx.config({
      debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: 'wxc6131ed385c72504', // 必填，公众号的唯一标识
      timestamp: 1517390848, // 必填，生成签名的时间戳
      nonceStr: '989605798', // 必填，生成签名的随机串
      signature: 'f7b40578808faf16b5a99c2cf7c9d5b140176ec8',// 必填，签名，见附录1
      jsApiList: ['checkJsApi', 'scanQRCode'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    })
    wx.ready(function(){
        wx.scanQRCode({   
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
              var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                console.log(res);
                alert(res);
                var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                sessionStorage.setItem('saomiao_result',result);
                //其它网页调用二维码扫描结果： 
                //var result=sessionStorage.getItem('saomiao_result');
            }
        });
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
    });
    wx.error(function(res){
      console.log(res,'cccc')
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
    });
  }
  renderContent(item) {
    //若有自定义跳转页面的。在这写
    //browserHistory.push(item.guideurl)
  }

  render() {
    return (
      <div className="index" >
        <div className="index-content" style={{overflowX: 'scroll',height: document.documentElement.clientHeight - (this.refs.tabBarTmp ? this.refs.tabBarTmp.offsetHeight : 50)}}>
          <div className="header">
            <div className="header-content">
              <h4>
                小基因，第一次测的基因
              </h4>
              <p>
                正经的科学也很有趣<br/>
                进一步了解
              </p>
            </div>
            <div className="header-item">
             <div className="header-item-bj"></div>
              <div className="header-item-content">
                <span className="header-item-1">点我试试</span>
                <span className="header-item-2">点我试试</span>
                <span className="header-item-3">点我试试</span>
              </div>
            </div>
          </div>
          <div className="banner">
            <div></div>
          </div>
          <div className="indexfocus"></div>
          <div className="list">
            <div className="list-item clearfix">
              <img src="" className="list-item-img" />
              <div className="list-item-warp ">
                <span className="list-item-warp-title">让你秒懂染色体、DNA、基因的关系</span>
                <span className="list-item-warp-content">
                  这里可以加一些文字内容，要不然会显得空
                </span>
              </div>
            </div>
            <div className="list-item clearfix">
              <img src="" className="list-item-img" />
              <div className="list-item-warp ">
                <span className="list-item-warp-title">让你秒懂染色体、DNA、基因的关系</span>
                <span className="list-item-warp-content">
                  这里可以加一些文字内容，要不然会显得空
                </span>
              </div>
            </div>
            <div className="list-item clearfix">
              <img src="" className="list-item-img" />
              <div className="list-item-warp ">
                <span className="list-item-warp-title">让你秒懂染色体、DNA、基因的关系</span>
                <span className="list-item-warp-content">
                  这里可以加一些文字内容，要不然会显得空
                </span>
              </div>
            </div>
          </div>
        </div>
        <div ref="tabBarTmp">
          <TabBar
            unselectedTintColor="#7a7a7a"
            tintColor="#1f69b4"
          >
            <TabBar.Item
              title={'首页'}
              icon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(../../../../img/beijing.png) center center /  21px 21px no-repeat' }}
                />
              }
              selectedIcon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(../../../../img/beijing.png) center center /  21px 21px no-repeat' }}
                />
              }
              onPress={this.renderContent.bind(this)}
            >
            </TabBar.Item>
            <TabBar.Item
              title={'购买'}
              icon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(../../../../img/beijing.png) center center /  21px 21px no-repeat' }}
                />
              }
              selectedIcon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(../../../../img/beijing.png) center center /  21px 21px no-repeat' }}
                />
              }
              onPress={this.renderContent.bind(this)}
            >
            </TabBar.Item>
            <TabBar.Item
              title={'报告'}
              icon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(../../../../img/beijing.png) center center /  21px 21px no-repeat' }}
                />
              }
              selectedIcon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(../../../../img/beijing.png) center center /  21px 21px no-repeat' }}
                />
              }
              onPress={this.renderContent.bind(this)}
            >
            </TabBar.Item>
            <TabBar.Item
              title={'我的'}
              icon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(../../../../img/beijing.png) center center /  21px 21px no-repeat' }}
                />
              }
              selectedIcon={
                <div style={{
                  width: '22px',
                  height: '22px',
                  background: 'url(../../../../img/beijing.png) center center /  21px 21px no-repeat' }}
                />
              }
              onPress={this.renderContent.bind(this)}
            >
            </TabBar.Item>
          </TabBar>
        </div>
      </div>
    );
  }

}

export default translate()(connect((state, ownProps) => ({
  children: ownProps.children,
}), () => ({
  actions: {
  },
}))(toJS(Index)));
