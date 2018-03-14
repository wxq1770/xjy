import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { bindActionCreators } from 'redux';
import React, { PureComponent } from 'react';
import { NavBar, Icon,Picker } from 'antd-mobile';
import { createForm } from 'rc-form';
import { hashHistory } from 'react-router';
import TabBarItem from '../../../components/TabBarItem';
import BuyAccount from '../../../components/BuyAccount';

import toJS from '../../../libs/toJS';
import {
  progressInfo,
} from './actions';
import './index.less';


class ReportProgress extends PureComponent {
  constructor(props) {
    window.history.replaceState({},
      document.title,
      window.location.pathname + window.location.hash,
    );
    super(props);
    console.log(this.props.params);
    this.state = {
      inspector_id: this.props.params && this.props.params.inspector_id ? parseInt(this.props.params.inspector_id) : '',
      goods_id: this.props.params && this.props.params.goods_id ? parseInt(this.props.params.goods_id) : '',
      bind_id: this.props.params && this.props.params.bind_id ? parseInt(this.props.params.bind_id) : '',
      current_status: '',
      list: [],
    };
  }
  componentDidMount = async () => {
    const { actions } = this.props;
    const { bind_id } = this.state;
    try {
      const { value: { status, msg, data }} = await actions.progressInfo({
        body: {
          bind_id: bind_id,
        },
      });
      this.setState({
        current_status: data.current_status,
        list: data.list,
      });

    } catch (error) {
      // 处理登录错误
      throw error;
    }
  }
  binding = () => {
    hashHistory.push({
        pathname: '/binding',
    });
  }
  render() {
    const { list, current_status } = this.state;
    let progressList = [];
    if(current_status === 0){
      progressList = list.map(( item, index )=>{
        if(current_status === item.check_status && current_status === 0){
          return <li className="list-progress-item" key={item.check_status}>
            <span className="list-progress-item-title">{item.title}</span>
            <span className="list-progress-item-txt">您还没有绑定样本</span>
            <span className="list-progress-item-btn" onClick={this.binding}>立即绑定</span>
          </li>;
        }else if(current_status+1 === item.check_status && current_status === 0){
          return <li className="list-progress-item" key={item.check_status}>
            <span className="list-progress-item-title">{item.title}</span>
            <span className="list-progress-item-txt">{item.text}</span>
          </li>;
        }
      });
    }else if(current_status === 8){
      progressList = list.map(( item, index )=>{
        if(item.check_status === current_status && current_status === 8 ){
          return <li className="list-progress-item list-progress-item-fail" key={item.check_status}>
            <span className="list-progress-item-title list-progress-item-title-fail">{item.title}</span>
            <span className="list-progress-item-txt list-progress-item-txt-fail">{item.date} {item.text}</span>
          </li>;
        }else if(item.check_status < 7 && current_status === 8 ){
          return <li className="list-progress-item list-progress-item-ok" key={item.check_status}>
            <span className="list-progress-item-title list-progress-item-title-ok">{item.title}</span>
            <span className="list-progress-item-txt list-progress-item-txt-ok">{item.date} {item.text}</span>
          </li>;
        }else{
          return '';
        }
      });
    }else{
      progressList = list.map(( item, index )=>{
        if(item.check_status <= current_status && current_status < 7){
          return <li className="list-progress-item list-progress-item-ok" key={item.check_status}>
            <span className="list-progress-item-title list-progress-item-title-ok">{item.title}</span>
            <span className="list-progress-item-txt list-progress-item-txt-ok">{item.date} {item.text}</span>
          </li>;
        }else if(current_status+1 === item.check_status && current_status < 7){
          return <li className="list-progress-item" key={item.check_status}>
            <span className="list-progress-item-title">{item.title}</span>
            <span className="list-progress-item-txt">{item.date} {item.text}</span>
          </li>;
        }
      });
    }
    return (
      <div className="report report-progress" style={{minHeight : document.documentElement.clientHeight}}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => window.history.go(-1)}
        >我的报告</NavBar>
        <div className="report-header">
          <div className="report-header-p1">
            <h2>打开小基因，发现大不同</h2>
          </div>
        </div>
        <ul className="list-progress">
          {progressList}
        </ul>
      </div>
    );
  }
}

export default createForm()(translate()(connect(() => ({
}), dispatch => ({
  actions: {
    progressInfo: bindActionCreators(progressInfo, dispatch),
  },
}))(toJS(ReportProgress))));
