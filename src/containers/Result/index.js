import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { bindActionCreators } from 'redux';
import React, { PureComponent } from 'react';
import { NavBar, Icon,Picker } from 'antd-mobile';
import { createForm } from 'rc-form';
import BuyAccount from '../../components/BuyAccount';

import toJS from '../../libs/toJS';
import {
  focusStatus,
  subscribe,
  isSubscribe,
} from '../Index/actions';

import {
  orderList,
} from '../User/Order/actions';

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
      page: this.props.params.page,
      status: this.props.params.status,
      id: this.props.params.id,
      focusStatus: false,
      is_login: true,
      is_binded:0,
      is_order:0,
    };
  }

  componentDidMount() {
    if (navigator.platform.indexOf('Win') > -1) {
      document.body.classList.add('windows');
    }
    this.orderList();
  }
  componentDidUpdate = async () => {
    const { actions } = this.props;
    try {
      const { value: { status, msg, data }} = await actions.isSubscribe({
        body: {
          goods_id:1,
        },
      });
      if(status === 1009){
        this.setState({
          is_login: false,
          is_binded: 0,
        });
      }else if(status === 1 && data.is_subscribe === 1){
        this.setState({
          is_login: true,
          is_binded: 1,
        });
      }
    } catch (error) {
      // 处理登录错误
      throw error;
    }
  }
  orderList  = async () => {
    const { actions } = this.props;
    const { relationArr } = this.state;
    const { value: {status, msg, data }} = await actions.orderList({
      body: {},
    });
    this.setState({
      is_order : status === 1 && data.list.length > 0 ? 1 : 0,
    });
  }
  myOrder = (id) => {
    this.props.router.push('/user/order/details/'+id);
  }
  back = () => {
    window.history.go(-1);
  }
  focus = async () => {
    if(this.props.focusStatus){
      return false;
    }
    const { actions } = this.props;
    try {
      const { value: { status, msg, data }} = await actions.subscribe({
        body: {
          goods_id: 1,
        },
      });
      if(status === 1){
        actions.focusStatus(true);
        this.setState({
          is_binded: 1,
        });
      }else{
        actions.focusStatus(false);
        this.setState({
          is_binded: 0,
        });
      }
    } catch (error) {
      // 处理登录错误
      throw error;
    }
  }
  render() {
    const {
      submitting,
      status,
      page,
      id,
      is_binded,
      is_order,
      is_login,
    } = this.state;
    let content = '';

    if(page === 'address' && status === 'historyperson'){
      content = <div>
        <h4>支付成功</h4>
        <p>
          感谢您的再次支持，我们会尽快为您检测<br/>
          点击 <span className='my-order' onClick={this.myOrder.bind(this,id)}>我的订单</span> 关注订单状态
        </p>
        <div className="indexfocus"  style={{display:( is_order && is_login ? 'block' : 'none' )}}>
          <p className="indexfocus-titile"><strong>【我们的习惯】</strong>等你解锁</p>
          <p>从个人基因角度探索喝咖啡、喝牛奶<br/>、吸烟、睡眠对你的影响</p>
          <p>关注人数过千即可成功解锁</p>
          <div className={ this.props.focusStatus || is_binded ? "shulv" : "shuhui"}></div>
          <span className="focus-btn" onClick={this.focus}>{ this.props.focusStatus || is_binded ? "已关注" : "点击关注"}</span>
        </div>
      </div>
    }else if(page === 'address' && status === 'succeed'){
      content = <div>
        <h4>支付成功</h4>
        <p>
          感谢您对小基因的支持<br/>
          我们将于3个工作日内发货<br/>
          点击 <span className='my-order' onClick={this.myOrder.bind(this,id)}>我的订单</span> 关注订单状态
        </p>
        <div className="indexfocus"  style={{display:( is_order && is_login ? 'block' : 'none' )}}>
          <p className="indexfocus-titile"><strong>【我们的习惯】</strong>等你解锁</p>
          <p>从个人基因角度探索喝咖啡、喝牛奶<br/>、吸烟、睡眠对你的影响</p>
          <p>关注人数过千即可成功解锁</p>
          <div className={ this.props.focusStatus || is_binded ? "shulv" : "shuhui"}></div>
          <span className="focus-btn" onClick={this.focus}>{ this.props.focusStatus || is_binded ? "已关注" : "点击关注"}</span>
        </div>
      </div>
    }else if(page === 'address' && status === 'fail'){
      content = <div>
        <h4>支付失败</h4>
        <p>
          请重新支付再试试<br/>
          也可呼唤小基因客服哦<br/>
        </p>
        <span className="result-content-btn" onClick={this.back}>重新支付</span>
      </div>
    }else if(page === 'binding' && status === 'succeed'){
      content = <div>
        <h4>绑定成功！</h4>
        <p>
          请您采样后，将样本包装好寄给我们<br/>
          小基因会快马加鞭为您检测
        </p>
        <span className="result-content-btn" onClick={()=>{this.props.router.push('/index')}}>返回首页</span>
        <span className="result-content-btn" onClick={()=>{this.props.router.push('/report/progress/'+id+'/0/0')}}>查看进度</span>
      </div>
    }
    return (
      <div className="result">
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => window.history.go(-1)}
        >购买</NavBar>
        <div className={"result-content "+(status === 'succeed' || status === 'historyperson' ? 'result-succeed' : 'result-fail')}  style={{height: `${window.screen.height-50}px`}}>
          {content}
        </div>
      </div>
    );
  }
}

export default translate()(connect((state, ownProps) => ({
  focusStatus : state.getIn(['indexReducer', 'focusStatus']),
}), dispatch => ({
  actions: {
    focusStatus: bindActionCreators(focusStatus, dispatch),
    orderList: bindActionCreators(orderList, dispatch),
    subscribe: bindActionCreators(subscribe, dispatch),
    isSubscribe: bindActionCreators(isSubscribe, dispatch),
  },
}))(toJS(Result)));
