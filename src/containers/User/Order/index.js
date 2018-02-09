import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { bindActionCreators } from 'redux';
import React, { PureComponent } from 'react';
import { NavBar, Icon, ListView } from 'antd-mobile';
import { createForm } from 'rc-form';
import toJS from '../../../libs/toJS';
import {
  orderList,
} from './actions';
import './index.less';

class UserOrder extends PureComponent {

  constructor(props) {
    window.history.replaceState({},
      document.title,
      window.location.pathname + window.location.hash,
    );
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.page = 1;
    this.page_size = 10;
    this.page_total = 0;
    this.state = {
      dataSource,
      list: [],
      isLoading: true,
    };
  }
  componentDidMount() {
    if (navigator.platform.indexOf('Win') > -1) {
      document.body.classList.add('windows');
    }
    this.onEndReached();
  }
  onEndReached = async () => {
    const { actions } = this.props;
    const list = [];
    try {
      if (this.state.isLoading) {
        const { value: { status, msg, data }} = await actions.orderList({
          body: {
            page: this.page,
            page_size: this.page_size,
          },
        });
        this.state.list.map(item => {
          list.push(item);
          return item;
        });
        data.list.map(item => {
          list.push(item);
          return item;
        });

        this.page++;
        this.page_total = data.page_total;
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(list),
          isLoading: this.page !== this.page_total,
          list,
        });
      }
    } catch (error) {
      // 处理登录错误
      throw error;
    }
  }
  pay = () => {
    console.log('支付');
  }
  details = item => {
    this.props.router.push(`/user/order/details/${item.order_id}`);
  }
  render() {
    const row = (rowData, sectionID, rowID) => {
      return (
        <div className="product-info" key={rowID} onClick={() => this.details(rowData)}>
          <div className="product-info-header">
            <span className="product-info-header-left">订单号：{rowData.order_sn}</span>
            <span className="product-info-header-right"><span>{rowData.status_name}</span><Icon type="right" /></span>
          </div>
          {
            rowData.gene_list.map((item, i) => {
              return <div className="product-info-content" key={i}>
                <div className="product-info-content-left">
                  <span className="color-666">检测人：{item.remark}</span>
                  <span>检测包含：{item.goods_names}</span>
                </div>
                <span className="moeny">￥{item.total_price}元</span>
              </div>;
            })
          }
          <div className="footer-btn">
            <div className="footer-btn-right" onClick={this.pay} style={{ display: rowData.status_name === '待支付' ? 'blcok' : 'none' }}>
              <span className="footer-btn-span">立即付款</span>
            </div>
            <div className="footer-btn-money">
              合计付款：{rowData.order_amount}元
            </div>
          </div>
        </div>
      );
    };
    return (
      <div className="user-order">
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => console.log('onLeftClick')}>
          我的订单
        </NavBar>
        <ListView
          ref={el => this.lv = el}
          dataSource={this.state.dataSource}
          renderFooter={() => (<div style={{ textAlign: 'center' }}>
            {this.state.isLoading ? '正在加载...' : '暂无数据'}
          </div>)}
          renderRow={row}
          pageSize={this.page_size}
          useBodyScroll
          scrollRenderAheadDistance={500}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={10} />
      </div>
    );
  }
}

export default createForm()(translate()(connect(() => ({
}), dispatch => ({
  actions: {
    orderList: bindActionCreators(orderList, dispatch),
  },
}))(toJS(UserOrder))));
