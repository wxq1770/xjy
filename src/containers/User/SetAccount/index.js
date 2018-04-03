import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { bindActionCreators } from 'redux';
import React, { PureComponent } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import { createForm } from 'rc-form';
import cookie from 'react-cookie';
import toJS from '../../../libs/toJS';
import {
  getUserInfo,
} from '../Index/actions';
import './index.less';

class SetAccount extends PureComponent {

  constructor(props) {
    window.history.replaceState({},
      document.title,
      window.location.pathname + window.location.hash,
    );
    super(props);
    this.state = {
      status: 0,
      mobile: '',
      nickname: '',
      head_pic: '',
    };
  }
  componentDidMount = async () => {
    const { actions } = this.props;
    try {
      const { value: { status, msg, data }} = await actions.getUserInfo({
        body: {},
      });

      if(status === 1 && data.is_login !== 1){
        this.setState({
          status: 1,
          mobile: data.mobile,
          nickname: data.nickname,
          head_pic: data.head_pic,
        });
      }else{
        this.setState({
          status: 0,
          mobile: '',
          nickname: '',
          head_pic: '',
        });
      }
    } catch (error) {
      // 处理登录错误
      throw error;
    }
  }
  renderContent = page => {
    this.props.router.push(page);
  }
  out = ()=>{
    cookie.remove('token');
    cookie.remove('user');
    cookie.remove('user_id');
    cookie.remove('PHPSESSID');
    cookie.remove('openid');
    this.renderContent('/index');
  }
  render() {
    const {mobile} = this.state;
    return (
      <div className="user-set-account">
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => window.history.go(-1)}
        >
          账户设置
        </NavBar>
        <ul className="user-set-account-info">
          <li>
            <span className="u-s-a-label">手机号码</span>
            <span className="u-s-a-value">{mobile.substr(0,3)+'****'+mobile.substr(7,11)}</span>
          </li>
        </ul>
        <p className="user-set-account-p">当前暂不支持自助修改手机号，如需修改请联系客服</p>
        <span className='user-set-account-btn' onClick={this.out}>退出当前账号</span>
      </div>
    );
  }
}

export default createForm()(translate()(connect(() => ({
}), dispatch => ({
  actions: {
    getUserInfo: bindActionCreators(getUserInfo, dispatch),
  },
}))(toJS(SetAccount))));
