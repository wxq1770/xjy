import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { bindActionCreators } from 'redux';
import React, { PureComponent } from 'react';
import { NavBar, Icon,Picker } from 'antd-mobile';
import { createForm } from 'rc-form';
import BuyAccount from '../../components/BuyAccount';

import toJS from '../../libs/toJS';
import {
  mobileExist,
} from './actions';
import './index.less';


class Result extends PureComponent {
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
      <div className="result">
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => console.log('onLeftClick')}
        >购买</NavBar>
        <div className="result-content result-fail"  style={{height: `${window.screen.height-50}px`}}>
          <h4>支付失败</h4>
          <p>
            别着急~<br/>
            点击重新支付在试试<br/>
            也可以呼唤小基因微信客服哦
          </p>
          <span className="result-content-btn">重新支付</span>
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
}))(toJS(Result))));
