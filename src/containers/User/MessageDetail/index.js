import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { bindActionCreators } from 'redux';
import React, { PureComponent } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import { createForm } from 'rc-form';
import toJS from '../../../libs/toJS';
import {
  messageInfo,
} from './actions';
import './index.less';

class Message extends PureComponent {
  constructor(props) {
    window.history.replaceState({},
      document.title,
      window.location.pathname + window.location.hash,
    );
    super(props);
    this.state = {
      msg_id : this.props.params.msg_id,
      title:'',
      message:'',
      send_time:'',
    };
  }
  componentDidMount = async () => {
    const { actions } = this.props;
    if (navigator.platform.indexOf('Win') > -1) {
      document.body.classList.add('windows');
    }

    try {
      const { value: { status, msg, data }} = await actions.messageInfo({
        body: {
          msg_id: this.state.msg_id,
        },
      });

      this.setState({
        msg_id : data.msg_id,
        title:data.title,
        message:data.message,
        send_time:data.send_time,
      });
      
    } catch (error) {
      // 处理登录错误
      throw error;
    }
  }
  renderContent = page => {
    this.props.router.push(page);
  }
  render() {
    const {title, message, send_time} = this.state;
    return (
      <div className="user-message-detail">
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => window.history.go(-1)}
        >
          通知详情
        </NavBar>
        <div className="user-message-detail-header">
          <h2 className="user-message-detail-title">{title}</h2>
          <div className="user-message-detail-ohter">
            <span className="user-message-detail-date">{send_time}</span>
          </div>
        </div>
        <div className="user-message-detail-warp">
          <div className="user-message-detail-content">
            <p dangerouslySetInnerHTML={{__html: message}}></p>
          </div>
        </div>
      </div>
    );
  }
}

export default createForm()(translate()(connect(() => ({
}), dispatch => ({
  actions: {
    messageInfo: bindActionCreators(messageInfo, dispatch),
  },
}))(toJS(Message))));
