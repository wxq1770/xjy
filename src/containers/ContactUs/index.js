import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { bindActionCreators } from 'redux';
import React, { PureComponent } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import { createForm } from 'rc-form';
import toJS from '../../libs/toJS';
import {
  orderList,
  getPayParamer,
} from './actions';
import './index.less';

class ContactUs extends PureComponent {
  constructor(props) {
    window.history.replaceState({},
      document.title,
      window.location.pathname + window.location.hash,
    );
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
    if (navigator.platform.indexOf('Win') > -1) {
      document.body.classList.add('windows');
    }
  }
  renderContent = page => {
    this.props.router.push(page);
  }
  render() {
    return (
      <div className="contact-us">
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => window.history.go(-1)}
        >联系我们</NavBar>
        <div className="contact-logo"></div>
        <ul className="user-list-nav">
          <li className="user-list-nav-item">
            <span className="u-l-n-i-title">客服电话</span>
            <span className="u-l-n-i-value-1">
              <span><a href="tel:4006001886" className="color-2">400-600-1886</a></span>
              <span className="color-1">工作日 9:30-17:30</span>
            </span>
          </li>
          <li className="user-list-nav-item">
            <span className="u-l-n-i-title">官方微信</span>
            <span className="u-l-n-i-value-1">
              <span>小基因服务号</span>
              <span className="color-1">ID minigene2017</span>
            </span>
          </li>
          <li className="user-list-nav-item">
            <span className="u-l-n-i-title">官方微博</span>
            <span className="u-l-n-i-value">小基因官微</span>
          </li>
          <li className="user-list-nav-item">
            <span className="u-l-n-i-title">邮件反馈</span>
            <span className="u-l-n-i-value">service@minigene.net</span>
          </li>
          <li className="user-list-nav-item">
            <span className="u-l-n-i-title">商务合作</span>
            <span className="u-l-n-i-value">
              <span>marketing@minigene.net</span>
            </span>
          </li>
          <li className="user-list-nav-item">
            <span className="u-l-n-i-title">公司地址</span>
            <span className="u-l-n-i-value-1">
              <span>北京市朝阳区惠新东街甲2号住总地产大厦</span>
              <span>邮编：100029</span>
            </span>
          </li>
        </ul>
      </div>
    );
  }
}

export default createForm()(translate()(connect(() => ({
}), dispatch => ({
  actions: {
    orderList: bindActionCreators(orderList, dispatch),
    getPayParamer: bindActionCreators(getPayParamer, dispatch),
  },
}))(toJS(ContactUs))));
