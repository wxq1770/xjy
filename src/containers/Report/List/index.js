import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { bindActionCreators } from 'redux';
import React, { PureComponent } from 'react';
import { hashHistory } from 'react-router';
import { NavBar, Icon, Popover } from 'antd-mobile';
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

const Item = Popover.Item;

class ReportList extends PureComponent {
  constructor(props) {
    window.history.replaceState({},
      document.title,
      window.location.pathname + window.location.hash,
    );
    super(props);
    this.state = {
      submitting: false,
      userList: [],
      caseList: [],
      visible: false,
      show: '',
      userTitle: '',
      is_login: false,
      loadingStatus: true,
      headerStatus: window.location.hash === '#/report/list' ? true : false,
    };
  }
  componentDidMount = async () => {
    const { actions } = this.props;
    try {
      const { value: { status, msg, data }} = await actions.isLogin({
        body: {},
      });
      if(status === 1 && data.is_login !== 1){
        this.setState({
          show: 'demo',
          is_login: false,
          submitting: true,
          loadingStatus:false,
        });
      }else{
        this.bindUserList();
        this.setState({
          is_login: true,
          loadingStatus:false,
        });
      }
    } catch (error) {
      // 处理登录错误
      throw error;
    }
  }
  bindUserList = async () => {
    const { actions } = this.props;
    try {
      const { value: { status, msg, data }} = await actions.bindUserList({
        body: {},
      });
      if(status === 1 && data.list && data.list.length > 0 && data.list[0].inspector_id){
        this.goodsProgressList(data.list[0].inspector_id);
        this.setState({
          show: 'list',
          userTitle: data.list && data.list.length > 0 && data.list[0].real_name ? data.list[0].real_name : '',
          inspector_id: data.list && data.list.length > 0 && data.list[0].inspector_id ? data.list[0].inspector_id : '',
          userList: data.list && data.list.length > 0 && data.list.length > 0 ? data.list : [],
          loadingStatus:false,
        });
      }else{
        this.setState({
          show: 'demo',
          submitting: true,
          loadingStatus:false,
        });
      }
    } catch (error) {
      // 处理登录错误
      throw error;
    }
  }
  goodsProgressList = async (argId) => {
    const { userList } = this.state;
    const { actions } = this.props;
    try {
      const { value: { status, msg, data }} = await actions.goodsProgressList({
        body: {
          inspector_id: argId,
        },
      });
      if(data.list.length > 0){
        this.setState({
          show: 'list',
          caseList: data.list && data.list.length > 0 ? data.list : [],
          submitting: true,
        });
      }else{
        this.setState({
          submitting: true,
          show: 'demo',
          caseList: data.list,
        });
      }
    } catch (error) {
      // 处理登录错误
      throw error;
    }
  }
  goDetail = (type, inspector_id , goods_id,bind_id )=> {
    if(type === 'list'){
      hashHistory.push({
          pathname: '/report/detail/'+bind_id+'/'+goods_id+'/'+inspector_id,
      });
    }else if(type === 'progress'){
      hashHistory.push({
          pathname: '/report/progress/'+bind_id+'/'+goods_id+'/'+inspector_id+'/'+this.state.userTitle,
      });
    }else{
      hashHistory.push({
          pathname: '/report/demo',
      });
    }
  }
  onSelect = (opt) => {
    this.setState({
      visible: false,
      userTitle: opt.props.name,
      inspector_id:opt.props.value,
      selected: opt.props.value,
    });
    this.goodsProgressList(opt.props.value);
  }

  handleVisibleChange = (visible) => {
    this.setState({
      visible,
    });
  }

  render() {
    const { show, caseList, userList, headerStatus, visible, userTitle, inspector_id, submitting } = this.state;

    const caseListDemo = <ul className="list-product" style={{display:(submitting ? 'block' : 'none')}}>
      <li className="list-product-item animated fadeInRight" onClick={this.goDetail.bind(this,'demo')}>
        <span className="icon-item-icon-1"></span>
        <span className="icon-item-txt">神奇小体验(示例)</span>
        <Icon type="right" />
      </li>
    </ul>;

    const caseListTmp = caseList.map( ( item, index ) => {
      const liClassName = index % 2 === 1 ? 'list-product-item list-product-item-1 animated fadeInRight' : 'list-product-item animated fadeInRight';
      const spanClassName = index % 2 === 1 ? 'icon-item-icon-2' : 'icon-item-icon-1';
      return <li className={liClassName} key={index} onClick={this.goDetail.bind(this,(item.check_status !== 7 ? 'progress' : 'list'),inspector_id,item.goods_id,item.bind_id)}>
        <span className={spanClassName}></span>
        <span className="icon-item-txt">{item.goods_name} <span className="list-product-item-info">{(item.check_status < 7 && item.check_status!==8? '报告生成中' : '')}</span></span>
        <Icon type="right" />
      </li>;
    });

    const caseTmp = show === 'demo' ? caseListDemo : show === 'list' ? <ul className="list-product" style={{display:(submitting ? 'block' : 'none')}}>{caseListTmp}</ul> : '';


    const title = submitting ? caseList.length > 0 ? <div className={"report-header-p1 "+(submitting ? 'animated fadeIn' : '')}><h2>打开小基因，发现大不同</h2></div> : <div className={"report-header-p2 "+(submitting ? 'animated fadeIn' : '')} >
      <h2>您还没有报告</h2>
      <p>
      请查看示例报告或购买产品获得自己的报告
      </p>
    </div> : '';

    const userListArray = [];
    userList.map( ( item, index) => {
      userListArray.push((<Item key={index} name={item.real_name} value={item.inspector_id}>{item.real_name}的报告</Item>))
    });

    const header = show === 'demo' ? '我的报告' :<Popover
      overlayClassName="popover-title"
      visible={visible}
      overlay={userListArray}
      onSelect={this.onSelect}
      onVisibleChange={this.handleVisibleChange}
      align={{
        overflow: { adjustY: 1, adjustX: 1 },
        offset: ['-42%', 3],
      }}
    >
      <div className={'header-popover'}><span className="title-sanjiao"  style={{display:(userTitle ? 'inline-block' : 'none')}}>{userTitle ? userTitle+'的报告' : ''}<em></em><span></span></span></div>
    </Popover>;

    const headerTmp = headerStatus ? header : <NavBar
      mode="dark"
      icon={<Icon type="left" />}
      onLeftClick={() => window.history.go(-1)}
      className={'animated fadeIn'}
    >
      {header}
    </NavBar>;

    return (
      <div className="report" >
        <div className="header">{headerTmp}</div>
        <div className={"report-header"}>
          {title}
        </div>
        {caseTmp}
        <dl className="footer" style={{display:(submitting ? 'block' : 'none')}}>
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
}))(toJS(ReportList))));
