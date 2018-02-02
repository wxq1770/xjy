import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { bindActionCreators } from 'redux';
import React, { PureComponent } from 'react';
import { NavBar, Icon, Checkbox,Picker, List, InputItem  } from 'antd-mobile';
import { createForm } from 'rc-form';
import BuyAccount from '../../components/BuyAccount';
import toJS from '../../libs/toJS';
import {
  mobileExist,
} from './actions';
import './index.less';
const list = require('china-location/dist/location.json');
const AgreeItem = Checkbox.AgreeItem;

const array =[]

for(let item in list){
  array.push({
    value : list[item].code,
    label : list[item].name,
    children : list[item].cities
  })
}

array.map((item)=>{
  const array = [];
  for(let i in item.children){
    array.push({
      value : item.children[i].code,
      label : item.children[i].name,
      children : item.children[i].districts,
    })
  }
  item.children = array;
  return item;
})

array.map((item)=>{
  item.children.map((key)=>{
    const array = [];
    for(let i in key.children){
      array.push({
        value : i,
        label : key.children[i]
      });
    }
    key.children = array
  })
})

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
          <List>
            <InputItem
              {...getFieldProps('autofocus')}
              clear
              placeholder="收货人姓名"
            >收货人</InputItem>
            <InputItem
              {...getFieldProps('phone')}
              clear
              type="phone"
              placeholder="手机号码"
            >手机号码</InputItem>
            <Picker extra="请选择(可选)"
              data={array}
              title="地址"
              {...getFieldProps('district')}
              onOk={e => console.log('ok', e)}
              onDismiss={e => console.log('dismiss', e)}
            >
              <List.Item extra="请选择地区" arrow="horizontal" onClick={() => this.setState({ visible: true })}>所在地区</List.Item>
            </Picker>
            <InputItem
              {...getFieldProps('focus')}
              clear
              placeholder="详细地址"
            >详情地址</InputItem>
          </List>
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
              <span className="a-p-i-label">不需要</span>
              <span className="a-p-i-label">个人</span>
              <span className="a-p-i-label">公司</span>
            </dd>
          </dl>
        </div>
        <List>
          <InputItem
            {...getFieldProps('autofocus')}
            clear
            placeholder="收货人姓名"
          >公司名称</InputItem>
          <InputItem
            {...getFieldProps('phone')}
            clear
            type="phone"
            placeholder="手机号码"
            labelNumber={6}
          >纳税人识别号</InputItem>
          <InputItem
            {...getFieldProps('focus')}
            clear
            placeholder="详细地址"
            labelNumber={13}
          >发票内容，基因检测服务费</InputItem>
        </List>
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
