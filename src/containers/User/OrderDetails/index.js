import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { bindActionCreators } from 'redux';
import React, { PureComponent } from 'react';
import { NavBar, NoticeBar, Icon, Toast, Modal} from 'antd-mobile';
import { createForm } from 'rc-form';
// import BuyAccount from '../../../components/BuyAccount';
import toJS from '../../../libs/toJS';
import {
  orderInfo,
  cancelOrder,
} from './actions';

import {
  getPayParamer,
} from '../Order/actions';

import './index.less';

class Order extends PureComponent {

  constructor(props) {
    window.history.replaceState({},
      document.title,
      window.location.pathname + window.location.hash,
    );
    super(props);
    this.id = this.props.params.id;
    this.state = {
      details: {},
      modal: false,
    };
  }

  componentDidMount = () => {
    if (navigator.platform.indexOf('Win') > -1) {
      document.body.classList.add('windows');
    }
    this.details();
  }
  details = async () => {
    const { actions } = this.props;
    try {
      const { value: { status, msg, data }} = await actions.orderInfo({
        body: {
          order_id: this.id,
        },
      });
      this.setState({
        details: data,
      });
    } catch (error) {
      // 处理登录错误
      throw error;
    }
  }
  pay = item => {
    console.log('支付', item);
  }
  cancelOrder = async () => {
    this.setState({
      modal: true,
    });
  }
  onPress = async () => {
    const { actions } = this.props;
    try {
      const { value: { status, msg }} = await actions.cancelOrder({
        body: {
          order_id: this.id,
        },
      });
      if(status !== 1) {
        Toast.info(msg);
      }else{
        Toast.info('取消成功！');
        this.details();
        this.setState({
          modal: false,
        });
        window.history.go(-1);
      }
    } catch (error) {
      // 处理登录错误
      throw error;
    }
  }

  onCloseModal = () => {
    this.setState({ modal: false });
  }

  payment = async (rowData) => {
    const { actions } = this.props;
    try {
      const { value: { status, msg, data }} = await actions.getPayParamer({
        body: {
          order_id: this.id,
        },
      });
      if (status === 1009) {
        Toast.info('您未登录3秒后自动跳转到登录页面', 3, () => this.props.router.push('/login?target=/address'));
      }if(status === 1) {
        window.WeixinJSBridge.invoke(
          'getBrandWCPayRequest', data.param
          , (res) => {
            if ( res.err_msg == "get_brand_wcpay_request:ok" ) {
              Toast.info('购买成功', 2, () => { this.props.router.push('/result/address/succeed/'+this.id); });
              this.details();
              actions.clearStore();
              actions.clearStoreBuy();
            }else if( res.err_msg == "get_brand_wcpay_request:fail" ) {
              Toast.info('支付失败', 3, () => this.props.router.push('/result/address/fail'));
            }
            this.setState({
              modal: false,
            });
          },
        );
      }else{
        Toast.info(msg);
      }
    } catch (error) {
      // 处理登录错误
      throw error;
    }
  }

  render() {
    const {
     details,
    } = this.state;
    const gene_list = details.gene_list && details.gene_list.length > 0 ? details.gene_list : [];
    const gene_list_name = gene_list.length > 0 ? gene_list.filter(item => item.history_id > 0) : [];
    const express = details.no_shipping === 0 && gene_list.length !== gene_list_name.length ? <div>
      <ul className="order-warp-ul">
        <li className="order-warp-li">
          <span className="o-w-l-name">收货人：</span>
          <span>{details.consignee}</span>
        </li>
        <li className="order-warp-li">
          <span className="o-w-l-name">手机号：</span>
          <span>{details.mobile}</span>
        </li>
        <li className="order-warp-li">
          <span className="o-w-l-name o-w-l-dizhi">收货地址：</span>
          <span className="o-w-l-dizhi-value">{details.address}</span>
        </li>
      </ul>
      <ul className="order-warp-ul" style={{ display: details.status_name === '已发货' ? 'block' : 'none' }}>
        <li className="order-warp-li">
          <span className="o-w-l-name">快递公司：</span>
          <span>{details.shipping_name}</span>
        </li>
        <li className="order-warp-li">
          <span className="o-w-l-name">快递单号：</span>
          <span>{details.shipping_sn}</span>
        </li>
      </ul>
    </div>
    : '';

    const noticeBar = gene_list.length > 0 && gene_list_name.length > 0 ? <NoticeBar icon={null}>您好，历史检测人<span style={{color:'#2ABEC4'}}>{gene_list_name.map((item => item.remark)).join('、')}</span>无需重复采样</NoticeBar> : '';

    const list = gene_list.map((item, i) => {
      const pwd = item.history_id > 0 ? <div className="product-info-content-right" style={{ height: '1.4rem', paddingTop: '0.18rem' }}>
          <span className="color-2a">历史检测人</span>
          <span className="color-2a-1">无需新密码</span>
        </div>
        :
        <div className="product-info-content-right" style={{ height: '1.4rem', paddingTop: '0.18rem' }}>
          <span className="color-2a">检测密码</span>
          <span className="color-2a-1">{item.check_code}</span>
        </div>;

      return <div className="product-info-content" key={i}>
        <div className="product-info-content-left" >
          <span style={{paddingLeft:'0.27rem'}}>检测人：{item.remark}</span>
          <span>检测产品：{item.goods_names}</span>
          <span>消费金额：{item.total_price}元</span>
        </div>
        {pwd}
      </div>;
    });

    return (
      <div className="order-details">
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => window.history.go(-1)}>
          订单详情
        </NavBar>
        {noticeBar}
        <div className="order-warp">
          <ul className="order-warp-ul">
            <li className="order-warp-li">
              <span className="o-w-l-name">订单号：</span>
              <span>{details.order_sn}</span>
              <span className="o-w-l-status" style={{ color: (details.status_name === '已支付' || details.status_name === '已发货' ? '#2ABEC4' :  details.status_name === '已取消' ? '#333' : '#FF8A00')}}>{details.status_name}</span>
            </li>
            <li className="order-warp-li">
              <span className="o-w-l-name">订单日期：</span>
              <span>{details.order_date}</span>
            </li>
          </ul>
          {express}
        </div>
        <div className="product-info">
          <div className="product-info-header">
            <span>检测产品</span>
          </div>
          {list}
        </div>
        <div className="footer-btn">
          <div className="footer-btn-money">
            实付：{details.order_amount}元
          </div>
          <div className="footer-btn-right" style={{ display: details.status_name === '待支付' ? 'block' : 'none' }}>
            <span onClick={() => this.cancelOrder(details)}>取消订单</span>
            <span className="footer-btn-span" onClick={this.payment}>立即付款</span>
          </div>
        </div>
        <Modal
          visible={this.state.modal}
          onClose={this.onCloseModal}
          transparent
          maskClosable={true}
          closable={true}
          title="提示"
          footer={[{
            text: '取消',
            onPress: this.onCloseModal,
          }, {
            text: '确定',
            onPress: this.onPress,
          }]}>
          <div>
            <div style={{ padding: '0.5rem' }}>您确定要取消订单吗？</div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default createForm()(translate()(connect(() => ({
}), dispatch => ({
  actions: {
    orderInfo: bindActionCreators(orderInfo, dispatch),
    cancelOrder: bindActionCreators(cancelOrder, dispatch),
    getPayParamer: bindActionCreators(getPayParamer, dispatch),
  },
}))(toJS(Order))));
