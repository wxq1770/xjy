import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { bindActionCreators } from 'redux';
import React, { PureComponent } from 'react';
import { NavBar, Icon, ListView, Badge } from 'antd-mobile';
import { createForm } from 'rc-form';
import toJS from '../../../libs/toJS';
import {
  messageList,
} from './actions';
import './index.less';

class Message extends PureComponent {
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

      if (this.state.isLoading) {
        const { value: { status, msg, data }} = await actions.messageList({
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
  renderContent = page => {
    this.props.router.push(page);
  }
  render() {
    const row = (rowData, sectionID, rowID) => {
      return (
        <div className="user-message-list-item" key={rowID} onClick={this.renderContent.bind(this,'/user/messagedetail/'+rowData.msg_id)}>
          <div className="u-m-l-i-header">
            {(rowData.status === 0 ? <Badge dot></Badge> : '')}
            <span className='u-m-l-i-label'>系统</span>
            <span className="u-m-l-i-title">{rowData.title}</span>
            <span className="u-m-l-i-date">{rowData.send_time}</span>
          </div>
          <div className="u-m-l-i-conent">
            <p>{rowData.message}</p>
            <Icon type="right" />
          </div>
        </div>
      );
    };
    return (
      <div className="user-message">
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => window.history.go(-1)}
        >
          通知
        </NavBar>
        <div className="user-message-list">
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
      </div>
    );
  }
}

export default createForm()(translate()(connect(() => ({
}), dispatch => ({
  actions: {
    messageList: bindActionCreators(messageList, dispatch),
  },
}))(toJS(Message))));
