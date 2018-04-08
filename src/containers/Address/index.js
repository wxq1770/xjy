import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { bindActionCreators } from 'redux';
import React, { PureComponent } from 'react';
import { NavBar, Icon, Checkbox, Picker, NoticeBar, List, InputItem, Toast, Modal } from 'antd-mobile';
import { createForm } from 'rc-form';
import BuyAccount from '../../components/BuyAccount';
import toJS from '../../libs/toJS';
import {
  addOrder,
  addressReducer,
  clearStore,
  getPayParamer,
  getOpenRegion,
  getMwebPayParam,
} from './actions';

import {
  clearStoreBuy,
} from '../Buy/actions';

import './index.less';
const list = require('china-location/dist/location.json');
const AgreeItem = Checkbox.AgreeItem;

const array = [];

for (let item in list) {
  array.push({
    value: list[item].code,
    label: list[item].name,
    children: list[item].cities,
  });
}

array.map(item => {
  const array = [];
  for (let i in item.children) {
    array.push({
      value: item.children[i].code,
      label: item.children[i].name,
      children: item.children[i].districts,
    });
  }
  item.children = array;
  return item;
});

array.map(item => {
  item.children.map(key => {
    const array = [];
    for (let i in key.children) {
      array.push({
        value: i,
        label: key.children[i],
      });
    }
    key.children = array;
  });
});

class Address extends PureComponent {

  constructor(props) {
    window.history.replaceState({},
      document.title,
      window.location.pathname + window.location.hash,
    );
    super(props);

    this.state = {
      submitting: false,
      historyPerson: [],
      tab: 0,
      modal: false,
      link: '',
      order_id: '',
      districtArr:[],
      discount_amount:0,
      formStatus:true,
    };
  }

  componentDidMount = async () => {
    const { actions } = this.props;

    if (this.props.buyReducer.length === 0) {
       window.history.go(-1);
       return false;
    }
    if (navigator.platform.indexOf('Win') > -1) {
      document.body.classList.add('windows');
    }
    let discount_amount = 0;

    this.props.buyReducer.map(key=>{
      key.product.map(item=>{
        if(item.checked){
          discount_amount = parseFloat(discount_amount) + parseFloat(item.discount_amount);
        }
        return item;
      });
      return key;
    });

    const  { value: {status, msg, data }} = await actions.getOpenRegion({
      body: {},
    });
    
    this.setState({
      tab: this.props.tab,
      invoice_person: this.props.invoice_person,
      invoice_title: this.props.invoice_title,
      invoice_number: this.props.invoice_number,
      consignee: this.props.consignee,
      mobile: this.props.mobile,
      address: this.props.address,
      district: this.props.district,
      buyReducer: this.props.buyReducer,
      districtArr: data.list,
      historyPerson: this.props.buyReducer.filter(item => {
        if (item.bind_id === '') {
          return false;
        }
        return true;
      }),
      discount_amount: discount_amount,
    });
  }
  submit = async () => {
    const { actions } = this.props;
    const { getFieldError } = this.props.form;
    let status = false;
    let value = [];
    
    try {
      this.props.form.validateFields((error, item) => {
        if (error && error.district) {
          Toast.info(getFieldError('district'), 2);
        }
        if (!error) {
          status = true;
          value = item;
        }
      });
      
      if(status){
        if(!this.state.formStatus){
          return false;
        }
        this.setState({
          formStatus: false,
        });
        const list = this.props.buyReducer.map(item => {
          return {
            remark: item.real_name,
            history_id: item.bind_id ? item.bind_id : 0,
            goods_ids: item.product.filter(item => {
              if (item.checked) {
                return true;
              }
              return false;
            }),
          };
        });

        const { value: {status, msg, data }} = await actions.addOrder({
          body: {
            list: list.map(item => {
              return {
                remark: item.remark,
                history_id: item.history_id,
                goods_ids: item.goods_ids.map(item => item.goods_id).join(','),
              };
            }),
            consignee: value.consignee ? value.consignee : '',
            province: value.district && value.district[0] ? value.district[0] : '',
            city: value.district && value.district[1] ? value.district[1] : '',
            district: value.district && value.district[2] ? value.district[2] : '',
            mobile: value.mobile ? value.mobile.replace(/\s+/g, "") : '',
            address: value.address ? value.address : '',
            invoice_type: this.state.tab,
            invoice_title: this.state.tab === 1 ? value.invoice_person ? value.invoice_person : '' : this.state.tab === 2 ? value.invoice_title ? value.invoice_title : '' : '',
            invoice_number: value.invoice_number ? value.invoice_number : '',
          },
        });
        if (status === 1009) {
          Toast.info('您未登录3秒后自动跳转到登录页面', 3, () => this.props.router.push('/login?target=/address'));
        } else if (status === 1 && this.state.historyPerson.length === this.props.buyReducer.length) {
          this.setState({
            link: '/result/address/historyperson/'+data.order_id,
            order_id: data.order_id,
          });
          this.onPress('/result/address/historyperson/'+data.order_id, data.order_id);
        } else if (status === 1) {
          this.setState({
            modal: true,
            link: '/result/address/succeed/'+data.order_id,
            order_id: data.order_id,
          });
          this.onPress('/result/address/succeed/'+data.order_id, data.order_id);
        } else if (status !== 1) {
          this.props.router.push('/result/address/fail');
        } else {
          Toast.info(msg, 2);
          this.setState({
            formStatus: true,
          });
        }
      }
    } catch (error) {
      // 处理登录错误
      throw error;
    }
  }
  tab = value => {
    const { actions } = this.props;
    actions.addressReducer('tab', value);
    this.setState({
      tab: value,
    });
  }
  onChange = (type, value) => {
    const { actions } = this.props;
    actions.addressReducer(type, value);
    this.props.form.setFieldsValue({
      [type]: value,
    });
  }
  onCloseModal = () => {
    this.setState({ modal: false });
    this.props.router.push('/result/address/fail');
  }
  onPress = async (url, order_id) => {
    const { actions } = this.props;
    const userAgent = window.navigator.userAgent.toUpperCase();
    if (userAgent.indexOf("MICROMESSENGER") > -1){
      try {
        const { value: { status, msg, data }} = await actions.getPayParamer({
          body: {
            order_id: order_id,
          },
        });
        if (status === 1009) {
          Toast.info('您未登录3秒后自动跳转到登录页面', 3, () => this.props.router.push('/login?target=/address'));
        }if(status === 1) {
          window.WeixinJSBridge.invoke(
            'getBrandWCPayRequest', data.param
            , (res) => {
              // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
              if ( res.err_msg == "get_brand_wcpay_request:ok" ) {
                actions.clearStore();
                actions.clearStoreBuy();
                this.props.router.push(url);
              }else if( res.err_msg == "get_brand_wcpay_request:fail" ) {
                this.props.router.push('/result/address/fail');
              }else if( res.err_msg == "get_brand_wcpay_request:cancel" ) {
                actions.clearStore();
                actions.clearStoreBuy();
                this.props.router.push('/user/order/details/'+order_id)
              }
              this.setState({
                modal: false,
              });
            },
          );
        }else{
          Toast.info(msg);
          this.setState({
            formStatus: true,
          });
        }
      } catch (error) {
        // 处理登录错误
        throw error;
      }
    }else{
      try {
        const { value: { status, msg, data }} = await actions.getMwebPayParam({
          body: {
            order_id: order_id,
          },
        });
        if(status === 1){
          window.location.href = data.param.mweb_url+'&redirect_url='+encodeURIComponent(data.param.jump_url);
        }else if (status === 1009) {
          Toast.info('您未登录3秒后自动跳转到登录页面', 3, () => this.props.router.push('/login?target=/address'));
        }else{
          Toast.info(msg, 3);
        }
      } catch (error) {
        // 处理登录错误
        throw error;
      }
    }
  }
  render() {
    const { getFieldProps, getFieldError } = this.props.form;
    const total = this.props.total;
    const tabValue = this.state.tab;
    const discount_amount = this.state.discount_amount;
    const historyPersonName = this.state.historyPerson.map(item => item.real_name);
    const tab = tabValue === 1 ?
      <div>
        <InputItem
          {...getFieldProps('invoice_person',
            {
              rules: [{ required: true, message: '请输入个人姓名' }],
              initialValue: this.state.invoice_person,
            },
          )}
          clear
          placeholder="个人姓名"
          error={getFieldError('invoice_person')}
          onErrorClick={()=>{Toast.info(getFieldError('invoice_person'),2)}}
          onChange={(v) => {this.onChange('invoice_person', v)}}
          maxLength={20}>
          个人姓名
        </InputItem>
        <div className="tab-info">发票内容，基因检测服务费</div>
      </div>
    : tabValue === 2 ?
      <div>
        <InputItem
          {...getFieldProps('invoice_title',
            {
              rules: [{ required: true, message: '请输入公司名称' }],
              initialValue: this.state.invoice_title,
            },
          )}
          clear
          placeholder="公司名称"
          error={getFieldError('invoice_title')}
          onChange={(v) => {this.onChange('invoice_title', v)}}
          onErrorClick={()=>{Toast.info(getFieldError('invoice_title'),2)}}
          maxLength={20}>
          公司名称
        </InputItem>
        <InputItem
          {...getFieldProps('invoice_number',
            {
              rules: [{ required: true, message: '请输入纳税人识别号' }],
              initialValue: this.state.invoice_number,
            },
          )}
          clear
          error={getFieldError('invoice_number')}
          onChange={(v) => {this.onChange('invoice_number', v)}}
          onErrorClick={()=>{Toast.info(getFieldError('invoice_number'),2)}}
          placeholder="纳税人识别号"
          labelNumber={6}
          maxLength={20}>
          纳税人识别号
        </InputItem>
        <div className="tab-info">发票内容，基因检测服务费</div>
      </div>
      : '';

      const addressForm = historyPersonName.length !== this.props.buyReducer.length ?
        <div className="address-set" >
          <h4 className="address-set-title">收货信息</h4>
          <List>
            <InputItem
              {...getFieldProps('consignee',
                {
                  rules: [{ required: true, message: '请输入您的收货人姓名' }],
                  initialValue: this.state.consignee
                }
              )}
              clear
              maxLength={6}
              error={getFieldError('consignee')}
              onChange={(v) => {this.onChange('consignee', v)}}
              onErrorClick={()=>{Toast.info(getFieldError('consignee'), 2)}}
              placeholder="收货人姓名"
            >收货人</InputItem>
            <InputItem
              {...getFieldProps('mobile',
                {
                  rules: [{
                    required: true, message: '请输入您的手机号码',
                  }, {
                    len: 13, message: '请输入11位手机号',
                  }],
                  initialValue: this.state.mobile
                }
              )}
              clear
              type="phone"
              clear
              maxLength={13}
              error={getFieldError('mobile')}
              onChange={(v) => {this.onChange('mobile', v)}}
              onErrorClick={()=>{Toast.info(getFieldError('mobile'),2)}}
              placeholder="手机号码"
            >手机号码</InputItem>
            <Picker extra="请选择（暂时仅限北京）"
              data={this.state.districtArr}
              title="所在地区"
              {...getFieldProps('district',
                {
                  rules: [{ required: true, message: '请选择所在地区' }],
                  initialValue: this.state.district
                }
              )}
              error={getFieldError('district')}
              onOk={(v) => {this.onChange('district', v)}}
              onErrorClick={()=>{Toast.info(getFieldError('district'),2)}}
            >
              <List.Item extra="请选择地区" arrow="horizontal" onClick={() => this.setState({ visible: true })}>所在地区</List.Item>
            </Picker>
            <InputItem
              {...getFieldProps('address',
                {
                  rules: [{ required: true, message: '请输入您的详细地址' }],
                  initialValue: this.state.address
                }
              )}
              maxLength={50}
              onChange={(v) => {this.onChange('address', v)}}
              error={getFieldError('address')}
              onErrorClick={()=>{Toast.info(getFieldError('address'),2)}}
              clear
              placeholder="详细地址"
            >详细地址</InputItem>
          </List>
        </div>
        :
        '';
      const Invoice = <div></div> || <dl className="address-pay-invoice">
        <dt>电子发票</dt>
        <dd>
          <span className={"a-p-i-label "+(tabValue === 0 ? 'cur' : '')} onClick={this.tab.bind(this,0)}>不需要</span>
          <span className={"a-p-i-label "+(tabValue === 1 ? 'cur' : '')} onClick={this.tab.bind(this,1)}>个人</span>
          <span className={"a-p-i-label "+(tabValue === 2 ? 'cur' : '')} onClick={this.tab.bind(this,2)}>公司</span>
        </dd>
      </dl>
    return (
      <div className="address">
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => window.history.go(-1)}
        >购买</NavBar>
        <NoticeBar style={{display:(historyPersonName.length > 0 ? 'flex' : 'none')}} marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
          您好，历史检测人<span style={{color:'#2ABEC4'}}>{historyPersonName.join('、')}</span>无需重复采样
        </NoticeBar>
        {addressForm}
        <div className="address-pay">
          <h4 className="address-pay-title">支付方式</h4>
          <dl className="address-pay-fun">
            <dt></dt>
            <dd>
              <span className={"icon-weixin cur"}>微信支付</span>
            </dd>
          </dl>
          {Invoice}
        </div>
        <List>
          {tab}
        </List>
        <BuyAccount total={{total}} discountAmount={discount_amount} submit={this.submit} />
      </div>
    );
  }
}

export default createForm()(translate()(connect(state => ({
  invoice_person: state.getIn(['addressReducer', 'invoice_person']),
  invoice_title: state.getIn(['addressReducer', 'invoice_title']),
  invoice_number: state.getIn(['addressReducer', 'invoice_number']),
  consignee: state.getIn(['addressReducer', 'consignee']),
  mobile: state.getIn(['addressReducer', 'mobile']),
  address: state.getIn(['addressReducer', 'address']),
  district: state.getIn(['addressReducer', 'district']),
  tab: state.getIn(['addressReducer', 'tab']),
  buyReducer: state.getIn(['buyReducer', 'buyReducer']),
  total: state.getIn(['buyReducer', 'total']),
}), dispatch => ({
  actions: {
    getOpenRegion: bindActionCreators(getOpenRegion, dispatch),
    addOrder: bindActionCreators(addOrder, dispatch),
    addressReducer: bindActionCreators(addressReducer, dispatch),
    clearStore: bindActionCreators(clearStore, dispatch),
    clearStoreBuy: bindActionCreators(clearStoreBuy, dispatch),
    getPayParamer: bindActionCreators(getPayParamer, dispatch),
    getMwebPayParam: bindActionCreators(getMwebPayParam, dispatch),
  },
}))(toJS(Address))));
