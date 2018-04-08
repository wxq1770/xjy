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
import {
  getMwebPayParam,
  getPayParamer,
} from '../../Address/actions';
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
            page_number: this.page,
            page_size: this.page_size,
          },
        });
        if(status === 1){
          this.state.list.map(item => {
            list.push(item);
            return item;
          });
          data.list.map(item => {
            list.push(item);
            return item;
          });
          this.page_total = data.page_total;
          if(this.page <= this.page_total){
            this.page++;
          }
        }
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(list),
          isLoading: this.page_total === 0 ? false : this.page <= this.page_total,
          list,
        });
      }
    } catch (error) {
      // 处理登录错误
      throw error;
    }
  }
  details = item => {
    this.props.router.push(`/user/order/details/${item.order_id}`);
  }
  payment = async (rowData) => {
    const { actions } = this.props;
    let that = this;
    const userAgent = window.navigator.userAgent.toUpperCase();
    if (userAgent.indexOf("MICROMESSENGER") > -1){
      try {
        const { value: { status, msg, data }} = await actions.getPayParamer({
          body: {
            order_id: rowData.order_id,
          },
        });
        if (status === 1009) {
          Toast.info('您未登录3秒后自动跳转到登录页面', 3, () => this.props.router.push('/login?target=/address'));
        }else if(status === 1) {
          window.WeixinJSBridge.invoke(
            'getBrandWCPayRequest', data.param
            , (res) => {
              if ( res.err_msg == "get_brand_wcpay_request:ok" ) {
                this.details(rowData);
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
    }else{
      try {
        const { value: { status, msg, data }} = await actions.getMwebPayParam({
          body: {
            order_id: rowData.order_id,
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
    const row = (rowData, sectionID, rowID) => {
      return (
        <div className="product-info" key={rowID} >
          <div className="product-info-header" onClick={() => this.details(rowData)}>
            <span className="product-info-header-left">订单号：{rowData.order_sn}</span>
            <span className="product-info-header-right"><span style={{ color: (rowData.status_name === '已支付' || rowData.status_name === '已发货' ? '#2ABEC4' :  rowData.status_name === '已取消' ? '#333' : '#FF8A00')}}>{rowData.status_name}</span><Icon type="right" /></span>
          </div>
          {
            rowData.gene_list.map((item, i) => {
              return <div className="product-info-content" key={i} onClick={() => this.details(rowData)}>
                <div className="product-info-content-left">
                  <span className="color-666">检测人：{item.remark}</span>
                  <span>检测包含：{item.goods_names}</span>
                </div>
                <span className="moeny">￥{item.total_price}元</span>
              </div>;
            })
          }
          <div className="footer-btn">
            <div className="footer-btn-right" style={{ display: rowData.status_name === '待支付' ? 'blcok' : 'none' }}>
              <span className="footer-btn-span" onClick={this.payment.bind(this,rowData)}>立即付款</span>
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
          onLeftClick={() => window.history.go(-1)}
        >
          我的订单
        </NavBar>
        <ListView
          ref={el => this.lv = el}
          dataSource={this.state.dataSource}
          renderFooter={() => (<div style={{ textAlign: 'center' }}>
            {this.state.isLoading  && this.state.dataSource.length > 0 ? '正在加载...' : '暂无数据'}
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
    getPayParamer: bindActionCreators(getPayParamer, dispatch),
    getMwebPayParam: bindActionCreators(getMwebPayParam, dispatch),
  },
}))(toJS(UserOrder))));
