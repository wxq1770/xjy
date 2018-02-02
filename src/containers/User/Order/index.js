import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { bindActionCreators } from 'redux';
import React, { PureComponent } from 'react';
import { NavBar, NoticeBar, List, InputItem, Icon  } from 'antd-mobile';
import { createForm } from 'rc-form';
import toJS from '../../../libs/toJS';
import {
  mobileExist,
} from './actions';
import './index.less';

class UserOrder extends PureComponent {
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
      <div className="user-order" style={{height: `${window.screen.height}px`}}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => console.log('onLeftClick')}
        >购买</NavBar>
        <NoticeBar mode="closable" icon={null}>您好，biubiu、条条已有样本无需邮寄</NoticeBar>
        <div className="product-info">
          <div className="product-info-header">
            <span>检测产品</span>
          </div>
          <div className="product-info-content">
            <div className="product-info-content-left">
              <span className="color-666">检测人</span>
              <span>检测包含：基础包</span>
            </div>
          </div>
          <div className="product-info-content">
            <div className="product-info-content-left">
              <span className="color-666">检测人</span>
              <span>检测包含：基础包</span>
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
}))(toJS(UserOrder))));
