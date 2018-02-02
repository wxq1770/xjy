import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { NavBar, Icon, Checkbox, Popover, ActionSheet,Picker, List, DatePicker, Radio } from 'antd-mobile';
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

class BindingRecord extends PureComponent {

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
    };
  }
  componentDidMount() {
    if (navigator.platform.indexOf('Win') > -1) {
      document.body.classList.add('windows');
    }
  }
  render() {
    return (
      <div className="binding-record">
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => console.log('onLeftClick')}
        >绑定记录</NavBar>
        <div className="binding-record-item">
          <div className="b-r-i-warp clearfix">
            <span className="b-r-i-warp-left">样本码：2123294892239</span>
            <span className="b-r-i-warp-right">检测密码：123123312</span>
          </div>
          <div className="b-r-i-warp clearfix">
            <span className="b-r-i-warp-left">绑定人：条条（男）<span className="benren">本人</span></span>
            <span className="b-r-i-warp-right">绑定日期：2017-01-22</span>
          </div>
          <div className="b-r-i-btn">再次购买</div>
        </div>
        <div className="binding-record-item">
          <div className="b-r-i-warp clearfix">
            <span className="b-r-i-warp-left">样本码：2123294892239</span>
            <span className="b-r-i-warp-right">检测密码：123123312</span>
          </div>
          <div className="b-r-i-warp clearfix">
            <span className="b-r-i-warp-left">绑定人：条条（男）<span className="benren">本人</span></span>
            <span className="b-r-i-warp-right">绑定日期：2017-01-22</span>
          </div>
          <div className="b-r-i-btn">再次购买</div>
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
}))(toJS(BindingRecord)));
