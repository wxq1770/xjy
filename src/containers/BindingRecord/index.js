import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { bindActionCreators } from 'redux';
import React, { PureComponent } from 'react';
import { NavBar, Icon, ListView } from 'antd-mobile';
import { createForm } from 'rc-form';
import toJS from '../../libs/toJS';
import {
  bindList,
} from './actions';
import './index.less';

class BindingRecord extends PureComponent{
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
    if(this.state.isLoading){
      const list = [];
      const { value: { status, msg, data }} = await actions.bindList({
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
  }
  onClick = item => {
    this.props.router.push(`/buyproduct/${item.bind_id}`);
  }
  render() {
    const row = (rowData, sectionID, rowID) => {
      return (
        <div className="binding-record-item" key={rowID}>
          <div className="b-r-i-header" style={{display: (rowData.relation === 1 ? 'block': 'none')}}>本人</div>
          <div className="b-r-i-warp clearfix">
            <span className="b-r-i-warp-left">样本码：{rowData.sample_code}</span>
            <span className="b-r-i-warp-right">检测密码：{rowData.check_code}</span>
          </div>
          <div className="b-r-i-warp clearfix">
            <span className="b-r-i-warp-left">绑定人：{rowData.real_name}（{rowData.sex === 1 ? '男' : '女'}）</span>
            <span className="b-r-i-warp-right">绑定日期：{rowData.bind_date}</span>
          </div>
          <div className="b-r-i-btn" onClick={() => this.onClick(rowData)}>再次购买</div>
        </div>
      );
    };
    return (
      <div className="binding-record">
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => window.history.go(-1)}>
          绑定记录
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
    bindList: bindActionCreators(bindList, dispatch),
  },
}))(toJS(BindingRecord))));
