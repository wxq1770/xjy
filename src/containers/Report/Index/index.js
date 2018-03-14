import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { bindActionCreators } from 'redux';
import React, { PureComponent } from 'react';
import { hashHistory } from 'react-router';
import { NavBar, Icon } from 'antd-mobile';
import { createForm } from 'rc-form';
import BuyAccount from '../../../components/BuyAccount';

import toJS from '../../../libs/toJS';

import {
  goodsProgressList,
  bindUserList,
} from './actions';

import {
  isLogin,
} from '../../App/actions';

import './index.less';

class ReportIndex extends PureComponent {
  constructor(props) {
    window.history.replaceState({},
      document.title,
      window.location.pathname + window.location.hash,
    );
    super(props);
    this.state = {};
  }
  componentDidMount(){
  }
  goDetail = ()=> {
      hashHistory.push({
          pathname: '/report/demo',
      });
  }
  render() {
    return (
      <div className="report">
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => window.history.go(-1)}
        >
        <span>示例报告</span>
        </NavBar>
        <div className="report-header">
          <div className="report-header-p1"><h2>打开小基因，发现大不同</h2></div>
        </div>
        <ul className="list-product">
          <li className="list-product-item" onClick={this.goDetail}>
            <span className="icon-item-icon-1"></span>
            <span className="icon-item-txt">神奇小体验(示例)</span>
            <Icon type="right" />
          </li>
          <li className="list-product-item list-product-item-1" onClick={this.goDetail}>
            <span className="icon-item-icon-2"></span>
            <span className="icon-item-txt">我们的习惯(示例)</span>
            <Icon type="right" />
          </li>
        </ul>
        <dl className="footer">
          <dt>关于检测结果的说明</dt>
          <dd><span className="icon-dian"></span><span className="footer-txt">检测覆盖的是相关性强的重要位点，而非全部位点；</span></dd>
          <dd><span className="icon-dian"></span><span className="footer-txt">基因只是影响性状特征的一个因素，环境、生活方式等同样会影响我们的生理表现；</span></dd>
          <dd><span className="icon-dian"></span><span className="footer-txt">小基因出具的检测结果是为了让您更好的了解自己的身体，而非用于临床诊断。</span></dd>
        </dl>
      </div>
    );
  }
}

export default createForm()(translate()(connect(() => ({
}), dispatch => ({
  actions: {
    goodsProgressList: bindActionCreators(goodsProgressList, dispatch),
    bindUserList: bindActionCreators(bindUserList, dispatch),
    isLogin: bindActionCreators(isLogin, dispatch),
  },
}))(toJS(ReportIndex))));
