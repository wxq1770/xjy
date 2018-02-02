import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { bindActionCreators } from 'redux';
import React, { PureComponent } from 'react';
import { NavBar, NoticeBar, List, InputItem, Icon  } from 'antd-mobile';
import { createForm } from 'rc-form';
import BuyAccount from '../../components/BuyAccount';
import toJS from '../../libs/toJS';
import {
  mobileExist,
} from './actions';
import './index.less';

class Order extends PureComponent {
  constructor(props) {
    window.history.replaceState({},
      document.title,
      window.location.pathname + window.location.hash,
    );
    super(props);
    this.state = {
      submitting: false,
    };
  }

  componentDidMount() {
    if (navigator.platform.indexOf('Win') > -1) {
      document.body.classList.add('windows');
    }
  }
  onChange = (e) => {

  }
  render() {
    const {
      submitting,
    } = this.state;
    const { getFieldProps } = this.props.form;
    return (
      <div className="order" style={{height: `${window.screen.height}px`}}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => console.log('onLeftClick')}
        >购买</NavBar>
        <NoticeBar mode="closable" icon={null}>您好，biubiu、条条已有样本无需邮寄</NoticeBar>
        <div className="order-warp">
          <ul className="order-warp-ul">
            <li className="order-warp-li">
              <span className="o-w-l-name">订单号：</span>
              <span>7893622738492</span>
              <span className="o-w-l-status">已发送</span>
            </li>
            <li className="order-warp-li">
              <span className="o-w-l-name">订单日期：</span>
              <span>2017-11-10</span>
            </li>
            <li className="order-warp-li">
              <span className="o-w-l-name">收货人：</span>
              <span>biubiu</span>
            </li>
            <li className="order-warp-li">
              <span className="o-w-l-name">手机号：</span>
              <span>13401002950</span>
            </li>
            <li className="order-warp-li">
              <span className="o-w-l-name">收货地址：</span>
              <span>北京市朝阳区和平西街</span>
            </li>
          </ul>
          <ul className="order-warp-ul">
            <li className="order-warp-li">
              <span className="o-w-l-name">快递公司：</span>
              <span>顺丰快递</span>
            </li>
            <li className="order-warp-li">
              <span className="o-w-l-name">快递单号：</span>
              <span>30492033110977</span>
              <span className="o-w-l-copy">点击复制</span>
            </li>
          </ul>
        </div>
        <div className="product-info">
          <div className="product-info-header">
            <span>检测产品</span>
          </div>
          <div className="product-info-content">
            <div className="product-info-content-left">
              <span className="color-666">检测人</span>
              <span>检测包含：基础包</span>
              <span>￥49元</span>
            </div>
            <div className="product-info-content-right">
              <span className="color-2a">检测密码</span>
              <span className="color-666-1">点击复制</span>
              <span className="color-2a-1">GN1037J08</span>
            </div>
          </div>
          <div className="product-info-content">
            <div className="product-info-content-left">
              <span className="color-666">检测人</span>
              <span>检测包含：基础包</span>
              <span>￥49元</span>
            </div>
            <div className="product-info-content-right">
              <span className="color-2a">检测密码</span>
              <span className="color-666-1">点击复制</span>
              <span className="color-2a-1">GN1037J08</span>
            </div>
          </div>
        </div>
        <div className="footer-btn">
          <div className="footer-btn-money">
            实付：208元
          </div>
          <div className="footer-btn-right">
            <span >取消订单</span>
            <span className='footer-btn-span'>立即付款</span>
          </div>
        </div>
      </div>
    );
  }

}

export default createForm()(translate()(connect(() => ({
}), dispatch => ({
  actions: {
    mobileExist: bindActionCreators(mobileExist, dispatch),
  },
}))(toJS(Order))));
