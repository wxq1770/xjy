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
    this.state = {
      inspector_id: this.props.params && this.props.params.inspector_id ? parseInt(this.props.params.inspector_id) : '',
      goods_id: this.props.params && this.props.params.goods_id ? parseInt(this.props.params.goods_id) : '',
      bind_id: props.bind_id ? props.bind_id  : this.props.params && this.props.params.bind_id ? parseInt(this.props.params.bind_id) : '',
      current_status: '',
      userTitle:props.userTitle ? props.userTitle  : this.props.params && this.props.params.userTitle ? this.props.params.userTitle : '产品进度',
      list: [],
      headerStatus: window.location.hash === '#/report/list' ? true : false,
    };
  }
  componentDidMount = async () => {
    const { actions } = this.props;
    const { bind_id } = this.state;
    if(bind_id === 'demo'){
      this.setState({
        current_status: 0,
        list: [{
          check_status: 0,
          title:'绑定样本',
        },{
          check_status: 1,
          title:'收到样本',
        },{
          check_status: 2,
          title:'提取DNA',
        },{
          check_status: 5,
          title:'DNA质检<br/>上机检测',
        },{
          check_status: 6,
          title:'数据解读',
        },{
          check_status: 7,
          title:'生成报告',
        }],
      });
    }else{
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
        if(current_status === item.check_status && current_status === 0 && item.text !== '样本已成功绑定'){
          return <li className="list-progress-item" key={item.check_status}>
            <span className="list-progress-item-title" dangerouslySetInnerHTML={{__html: item.title}}></span>
            <span className="list-progress-item-txt">您还没有绑定样本</span>
            <span className="list-progress-item-btn" onClick={this.binding}>立即绑定</span>
          </li>;
        }else if(item.text === '样本已成功绑定'){
          return <li className="list-progress-item list-progress-item-ok" key={item.check_status}>
            <span className="list-progress-item-title list-progress-item-title-ok" dangerouslySetInnerHTML={{__html: item.title}}></span>
            <span className="list-progress-item-txt list-progress-item-txt-ok">{item.date} {item.text}</span>
          </li>
        }else if(item.check_status === 5){
          return <li className="list-progress-item" key={item.check_status}>
            <span className="list-progress-item-title" style={{paddingTop:'0.43rem',lineHeight:'0.4rem'}} dangerouslySetInnerHTML={{__html: item.title}}></span>
          </li>;
        }else{
          return <li className="list-progress-item" key={item.check_status}>
            <span className="list-progress-item-title" dangerouslySetInnerHTML={{__html: item.title}}></span>
          </li>;
        }
      });
    }else if(current_status === 8){
      progressList = list.map(( item, index )=>{
        if(item.check_status === current_status && current_status === 8 ){
          return <li className="list-progress-item list-progress-item-fail" key={item.check_status}>
            <span className="list-progress-item-title list-progress-item-title-fail" dangerouslySetInnerHTML={{__html: item.title}}></span>
            <span className="list-progress-item-txt list-progress-item-txt-fail">{item.date} {item.text}</span>
          </li>;
        }else if(item.check_status === 5){
          return <li className="list-progress-item list-progress-item-ok" key={item.check_status}>
            <span className="list-progress-item-title list-progress-item-title-ok" style={{paddingTop:'0.43rem',lineHeight:'0.4rem'}} dangerouslySetInnerHTML={{__html: item.title}}></span>
            <span className="list-progress-item-txt list-progress-item-txt-ok" style={{paddingTop:'0.45rem',lineHeight:'0.4rem'}}>{item.date} {item.text}</span>
          </li>;
        }else if(item.check_status < 6 && current_status === 8 ){
          return <li className="list-progress-item list-progress-item-ok" key={item.check_status}>
            <span className="list-progress-item-title list-progress-item-title-ok" dangerouslySetInnerHTML={{__html: item.title}}></span>
            <span className="list-progress-item-txt list-progress-item-txt-ok">{item.date} {item.text}</span>
          </li>;
        }else{
          return '';
        }
      });
    }else{
      console.log('aaaa');
      progressList = list.map(( item, index )=>{
        if(item.check_status <= current_status && current_status < 7){
          if(item.check_status === 5 && current_status >= 5){
            return <li className="list-progress-item list-progress-item-ok" key={item.check_status}>
              <span className="list-progress-item-title list-progress-item-title-ok" style={{paddingTop:'0.43rem',lineHeight:'0.4rem'}} dangerouslySetInnerHTML={{__html: item.title}}></span>
              <span className="list-progress-item-txt list-progress-item-txt-ok" style={{paddingTop:'0.45rem',lineHeight:'0.4rem'}}>{item.date} {item.text}</span>
            </li>;
          }else if(item.check_status === 5){
            return <li className="list-progress-item" key={item.check_status}>
              <span className="list-progress-item-title" style={{paddingTop:'0.43rem',lineHeight:'0.4rem'}} dangerouslySetInnerHTML={{__html: item.title}}></span>
              <span className="list-progress-item-txt" style={{paddingTop:'0.45rem',lineHeight:'0.4rem'}}>{item.date} {item.text}</span>
            </li>;
          }else{
            return <li className="list-progress-item list-progress-item-ok" key={item.check_status}>
              <span className="list-progress-item-title list-progress-item-title-ok" dangerouslySetInnerHTML={{__html: item.title}}></span>
              <span className="list-progress-item-txt list-progress-item-txt-ok">{item.date} {item.text}</span>
            </li>;
          }
        }else{
          if(item.check_status === 5){
            return <li className="list-progress-item" key={item.check_status}>
              <span className="list-progress-item-title" style={{paddingTop:'0.43rem',lineHeight:'0.4rem'}} dangerouslySetInnerHTML={{__html: item.title}}></span>
            </li>;
          }else{
            return <li className="list-progress-item" key={item.check_status}>
              <span className="list-progress-item-title" dangerouslySetInnerHTML={{__html: item.title}}></span>
            </li>;
          }
        }
      });
    }

    const header =  this.state.headerStatus ? this.state.userTitle : <NavBar
      mode="dark"
      icon={<Icon type="left" />}
      onLeftClick={() => window.history.go(-1)}
      className={'animated fadeIn'}
    >
      {this.state.userTitle}
    </NavBar>;

    return (
      <div className="report report-progress" style={{minHeight : document.documentElement.clientHeight}}>
        <div className="header">{header}</div>
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
