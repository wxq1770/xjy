import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { bindActionCreators } from 'redux';
import React, { PureComponent } from 'react';
import { NavBar, Icon, Checkbox } from 'antd-mobile';
import { createForm } from 'rc-form';
import BuyAccount from '../../components/BuyAccount';

import toJS from '../../libs/toJS';
import {
  mobileExist,
} from './actions';
import './index.less';

const AgreeItem = Checkbox.AgreeItem;

class Buy extends PureComponent {
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

    return (
      <div className="buy" style={{height: `${window.screen.height}px`}}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => console.log('onLeftClick')}
        >购买</NavBar>
        <div className='buy-inspector'>
          <h2><span>历史检测人</span><span className="icon icon-wenhao"></span></h2>
          <div className='buy-inspector-lable'>
            <span className='cur'>武小青</span>
            <span>武小青</span>
            <span>武小青</span>
          </div>
        </div>
        <div className="buy-content">
          <div className="buy-bills">
            <div className="buy-bills-header">
              <div className="buy-bills-input" >
                <input type="text" />
                <span>保存</span>
              </div>
            </div>
            <div className="buy-bills-list">
              <AgreeItem onChange={this.onChange}>
                <div className="buy-bills-content">
                  <span className="buy-bills-title">神奇小体验</span>
                  <span className="icon icon-xiala"></span>
                  <span className="buy-bills-money">￥99元</span>
                </div>
              </AgreeItem>
              <AgreeItem onChange={this.onChange}>
                <div className="buy-bills-content">
                  <span className="buy-bills-title">神奇小体验</span>
                  <span className="icon icon-xiala"></span>
                  <span className="buy-bills-money">￥99元</span>
                </div>
              </AgreeItem>
            </div>
          </div>
          <div className="buy-bills">
            <div className="buy-bills-header">
              <div className="buy-bills-showname">
                <strong>吴晓青</strong>
                <span className="icon icon-bianji"></span>
              </div>
            </div>
            <div className="buy-bills-list">
              <AgreeItem onChange={this.onChange}>
                <div className="buy-bills-content">
                  <span className="buy-bills-title">神奇小体验</span>
                  <span className="icon icon-xiala"></span>
                  <span className="buy-bills-money">￥99元</span>
                </div>
              </AgreeItem>
              <AgreeItem onChange={this.onChange}>
                <div className="buy-bills-content">
                  <span className="buy-bills-title">神奇小体验</span>
                  <span className="icon icon-xiala"></span>
                  <span className="buy-bills-money">￥99元</span>
                </div>
              </AgreeItem>
            </div>
          </div>
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
}))(toJS(Buy))));
