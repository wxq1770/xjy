import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { bindActionCreators } from 'redux';
import React, { PureComponent } from 'react';
import { NavBar, Icon, Checkbox,Picker } from 'antd-mobile';
import { district, provinceLite } from 'antd-mobile-demo-data';
import { createForm } from 'rc-form';
import BuyAccount from '../../components/BuyAccount';

import toJS from '../../libs/toJS';
import {
  mobileExist,
} from './actions';
import './index.less';

console.log(district,'district')

const AgreeItem = Checkbox.AgreeItem;

class Address extends PureComponent {
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
      <div className="address" style={{height: `${window.screen.height}px`}}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => console.log('onLeftClick')}
        >购买</NavBar>
        <div className="address-set">
          <h4 className="address-set-title">收货信息</h4>
          <ul className="address-set-form">
            <li className="address-set-form-item">
              <span className="a-s-f-label">收货人：</span>
              <input type="text" className="a-s-f-input" />
            </li>
            <li className="address-set-form-item">
              <span className="a-s-f-label">手机号：</span>
              <input type="text" className="a-s-f-input" />
            </li>
            <li className="address-set-form-item">
              <span className="a-s-f-label">所在地区：</span>
              <Picker extra="请选择(可选)"
                data={district}
                title="地址"
                {...getFieldProps('district', {
                  initialValue: ['340000', '341500', '341502'],
                })}
                onOk={e => console.log('ok', e)}
                onDismiss={e => console.log('dismiss', e)}
              >
                <div className="select-city">请选择地区</div>
              </Picker>
            </li>
            <li className="address-set-form-item">
              <span className="a-s-f-label">详细地址：</span>
              <input type="text" className="a-s-f-input" placeholder="街道、楼牌号等" />
            </li>
          </ul>
        </div>
        <div className="address-pay">
          <h4 className="address-pay-title">支付信息</h4>
          <dl className="address-pay-fun">
            <dt>支付方式</dt>
            <dd>
              <span className="icon-weixin">微信支付</span>
              <span className="icon-zhifubao">支付宝</span>
            </dd>
          </dl>
          <dl className="address-pay-invoice">
            <dt>电子发票</dt>
            <dd>
              <span>不需要</span>
              <span>个人</span>
              <span>公司</span>
            </dd>
          </dl>
        </div>
        <BuyAccount />
      </div>
    );
  }

}

export default createForm()(translate()(connect(() => ({
}), dispatch => ({
  actions: {
    mobileExist: bindActionCreators(mobileExist, dispatch),
  },
}))(toJS(Address))));
