import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { bindActionCreators } from 'redux';
import React, { PureComponent } from 'react';
import { NavBar, Icon,Picker } from 'antd-mobile';
import { createForm } from 'rc-form';
import TabBarItem from '../../../components/TabBarItem';
import BuyAccount from '../../../components/BuyAccount';
import ReportList from '../List';
import ReportProgress from '../Progress';
import { BeatLoader } from 'react-spinners';
import toJS from '../../../libs/toJS';
import {
  goodsProgressList,
  bindUserList,
} from './actions';

import {
  orderList,
} from '../../User/Order/actions';

import {
  isLogin,
} from '../../App/actions';

import './index.less';


class ReportInit extends PureComponent {
  constructor(props) {
    window.history.replaceState({},
      document.title,
      window.location.pathname + window.location.hash,
    );
    super(props);
    this.state = {
      show: 'default',
      bind_id: '',
      loadingStatus: true,
      status: false,
    };
  }
  componentDidMount = async () => {
    const { actions } = this.props;
    try {
      const { value: { status, msg, data }} = await actions.isLogin({
        body: {},
      });
      console.log(status);
      if(status !== 1 || data.is_login !== 1){
        this.setState({
          show: 'list',
          status: true,
          loadingStatus:false,
        });
      }else{
        try {
          const { value: { status, msg, data }} = await actions.bindUserList({
            body: {},
          });
          const bindUserListData = data;
          try {
            const { value: {status, msg, data }} = await actions.orderList({
              body: {},
            });
            if(bindUserListData.list.length === 0){
              if(status === 1 && data.list.length > 0 && bindUserListData.list.length === 0){
                this.setState({
                  show: 'progress',
                  bind_id: 'demo',
                  status: true,
                  loadingStatus:false,
                });
              }else{
                this.setState({
                  show: 'list',
                  status: true,
                  loadingStatus:false,
                });
              }
            }else{
               try {
                const { value: { status, msg, data }} = await actions.goodsProgressList({
                  body: {
                    inspector_id: bindUserListData.list && bindUserListData.list.length > 0 && bindUserListData.list[0]['inspector_id'] ? bindUserListData.list[0]['inspector_id'] : '',
                  },
                });
                const goodsProgressListData = data;
                if(goodsProgressListData && goodsProgressListData.list.length === 1 && bindUserListData.list.length === 1 && goodsProgressListData.list[0].check_status !== 7){
                  this.setState({
                    show: 'progress',
                    bind_id: goodsProgressListData.list && goodsProgressListData.list[0]['bind_id'] ? goodsProgressListData.list[0]['bind_id'] : '',
                    status: true,
                    loadingStatus:false,
                  });
                }else{
                  this.setState({
                    show: 'list',
                    status: true,
                    loadingStatus:false,
                  });
                }
              } catch (error) {
                // 处理登录错误
                throw error;
              }
            }
          } catch (error) {
            // 处理登录错误
            throw error;
          }
        } catch (error) {
          // 处理登录错误
          throw error;
        }
      }
    } catch (error) {
      // 处理登录错误
      throw error;
    }
  }
  render() {
    const content = this.state.show === 'progress' ? <ReportProgress bind_id={this.state.bind_id} /> :  this.state.show === 'list' ? <ReportList /> : '' ;
    return (
      <div className="report">
        <div className={'page-loading animated '+(this.state.loadingStatus ? 'fadeInDown' : 'fadeOutDown')}>
          <BeatLoader color={'#2ABEC4'} loading={true} />
        </div>
        {content}
      </div>
    );
  }
}

export default createForm()(translate()(connect(() => ({
}), dispatch => ({
  actions: {
    goodsProgressList: bindActionCreators(goodsProgressList, dispatch),
    bindUserList: bindActionCreators(bindUserList, dispatch),
    isLogin: bindActionCreators(isLogin, dispatch),
    orderList: bindActionCreators(orderList, dispatch),
  },
}))(toJS(ReportInit))));
