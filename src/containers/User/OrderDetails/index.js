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
          <span className="o-w-l-name">收货地址：</span>
          <span>{details.address}</span>
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
          <span className="o-w-l-copy">点击复制</span>
        </li>
      </ul>
    </div>
    : '';

    const noticeBar = gene_list.length > 0 && gene_list_name.length > 0 && gene_list.length === gene_list_name.length ? <NoticeBar mode="closable" icon={null}>实验室已有,{gene_list_name.map((item => item.remark)).join('，')}的DNA样本,不需重复收集</NoticeBar> : '';

    const list = gene_list.map((item, i) => {
      const pwd = item.history_id > 0 ? <div className="product-info-content-right" style={{ height: '1.4rem', paddingTop: '0.18rem' }}>
          <span className="color-2a">检测人姓名</span>
          <span className="color-2a-1">{item.remark}</span>
        </div>
        :
        <div className="product-info-content-right">
          <span className="color-2a">检测密码</span>
          <span className="color-666-1">点击复制</span>
          <span className="color-2a-1">{item.check_code}</span>
        </div>;

      return <div className="product-info-content" key={i}>
        <div className="product-info-content-left" style={{ paddingTop: item.history_id > 0 ? '0.3rem' : '0' }}>
          <span className="color-666" style={{ display: item.history_id > 0 ? 'none' : 'block' }}>检测人：{item.remark}</span>
          <span>检测包含：{item.goods_names}</span>
          <span>￥{item.total_price}元</span>
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
              <span className="o-w-l-status">{details.status_name}</span>
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
            实付：208元
          </div>
          <div className="footer-btn-right" style={{ display: details.status_name === '待支付' ? 'block' : 'none' }}>
            <span onClick={() => this.cancelOrder(details)}>取消订单</span>
            <span className="footer-btn-span" onClick={() => this.pay(details)}>立即付款</span>
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
          }]}
          wrapProps={{ onTouchStart: this.onWrapTouchStart }}>
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
  },
}))(toJS(Order))));
