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
      page : this.props.params.page,
      status : this.props.params.status
    };
  }

  componentDidMount() {
    if (navigator.platform.indexOf('Win') > -1) {
      document.body.classList.add('windows');
    }
  }
  myOrder = () => {
    this.props.router.push('/user/order');
  }
  back = () => {
    window.history.go(-1);
  }
  render() {
    const {
      submitting,
      status,
      page
    } = this.state;
    const { getFieldProps } = this.props.form;
    let content = '';
    if(page === 'address' && status === 'historyperson'){
      content = <div>
        <h4>购买成功</h4>
        <p>
          感谢再次支持<br/>
          实验室已有您的样本，我们会尽快生成报<br/>
          告，请耐心等待
        </p>
      </div>
    }else if(page === 'address' && status === 'succeed'){
      content = <div>
        <h4>购买成功</h4>
        <p>
          感谢您对小基因的支持<br/>
          我们将于3个工作日内发货，点击<span className='my-order' onClick={this.myOrder}>我的订单</span><br/>
          关注订单状态
        </p>
      </div>
    }else if(page === 'address' && status === 'fail'){
      content = <div>
        <h4>支付失败</h4>
        <p>
          别着急~<br/>
          点击重新支付在试试<br/>
          也可以呼唤小基因微信客服哦~
        </p>
        <span className="result-content-btn" onClick={this.back}>重新支付</span>
      </div>
    }else if(page === 'binding' && status === 'succeed'){
      content = <div>
        <h4>绑定成功！</h4>
        <p>
          请您将样本包装好邮寄给我们<br/>
          小基因会尽快给您出报告的
        </p>
        <span className="result-content-btn" onClick={()=>{this.props.router.push('/index')}}>返回首页</span>
        <span className="result-content-btn" onClick={()=>{this.props.router.push('/index')}}>查看进度</span>
      </div>
    }
    return (
      <div className="result">
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => window.history.go(-1)}
        >购买</NavBar>
        <div className={"result-content "+(status === 'succeed' ? 'result-succeed' : 'result-fail')}  style={{height: `${window.screen.height-50}px`}}>
          {content}
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
