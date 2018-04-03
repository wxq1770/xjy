import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { bindActionCreators } from 'redux';
import React, { PureComponent } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import { createForm } from 'rc-form';
import toJS from '../../../libs/toJS';
import {
  getUserInfo,
} from './actions';
import './index.less';

class UserIndex extends PureComponent {
  constructor(props) {
    window.history.replaceState({},
      document.title,
      window.location.pathname + window.location.hash,
    );
    super(props);
    this.state = {
      mobile: '',
      nickname: '',
      head_pic: '',
      state: false,
    };
  }
  componentDidMount = async () => {
    const { actions } = this.props;
    try {
      const { value: { status, msg, data }} = await actions.getUserInfo({
        body: {},
      });

      if(status === 1 && data.is_login !== 1){
        this.setState({
          status: 1,
          state:true,
          mobile: data.mobile,
          nickname: data.nickname,
          head_pic: data.head_pic,
        });
      }else{
        this.setState({
          status: 0,
          state:true,
          mobile: '',
          nickname: '',
          head_pic: '',
        });
      }
    } catch (error) {
      // 处理登录错误
      throw error;
    }
  }
  renderContent = page => {
    this.props.router.push(page);
  }
  render() {
    const {mobile, nickname, head_pic, status, state} = this.state;
    const nicknameStr = status === 1 ? nickname ? <span className="user-nickname">{nickname}</span> : <span className="user-nickname">游客</span>  : <span className="user-info-btn"><span onClick={this.renderContent.bind(this,'/register')}>注册</span>/<span onClick={this.renderContent.bind(this,'/login')}>登录</span></span>;

    return (
      <div className="user-index">
        <div className="user-header">
          <h2 className="user-title">个人中心</h2>
          <span className="user-email" onClick={this.renderContent.bind(this,'/user/message')}></span>
          <div className="user-info">
            <span className="user-info-head">
              <img src={ head_pic ? head_pic : "http://www.minigene.net/assets/img/user_touxiang.png" } className="user-info-head-src" />
            </span>
            <div style={{display:(state?'block':'none')}}>
            { nicknameStr }
            </div>
          </div>
        </div>
        <ul className="user-list-nav">
          <li className="user-list-nav-item" onClick={this.renderContent.bind(this,'/user/order')}>
            <span className="u-l-n-i-icon u-l-n-i-icon-1"></span>
            <span className="u-l-n-i-title">我的订单</span>
            <Icon type="right" />
          </li>
          <li className="user-list-nav-item" onClick={this.renderContent.bind(this,'/binding')}>
            <span className="u-l-n-i-icon u-l-n-i-icon-2"></span>
            <span className="u-l-n-i-title">绑定样本</span>
            <Icon type="right" />
          </li>
          <li className="user-list-nav-item" onClick={this.renderContent.bind(this,'/report/init')}>
            <span className="u-l-n-i-icon u-l-n-i-icon-3"></span>
            <span className="u-l-n-i-title">查看报告</span>
            <Icon type="right" />
          </li>
          <li className="user-list-nav-item" onClick={this.renderContent.bind(this,'/user/help')}>
            <span className="u-l-n-i-icon u-l-n-i-icon-4"></span>
            <span className="u-l-n-i-title">帮助中心</span>
            <Icon type="right" />
          </li>
          <li className="user-list-nav-item" onClick={this.renderContent.bind(this,'/user/setaccount')}>
            <span className="u-l-n-i-icon u-l-n-i-icon-5"></span>
            <span className="u-l-n-i-title">账户设置</span>
            <Icon type="right" />
          </li>
        </ul>
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

export default createForm()(translate()(connect(() => ({
}), dispatch => ({
  actions: {
    getUserInfo: bindActionCreators(getUserInfo, dispatch),
  },
}))(toJS(UserIndex))));
