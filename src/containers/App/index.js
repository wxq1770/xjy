import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
// import { bindActionCreators } from 'redux';
import cookie from 'react-cookie';
import React, { PureComponent } from 'react';
import TabBarItem from '../../components/TabBarItem';
import toJS from '../../libs/toJS';

import './index.less';

class App extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
  }

  constructor(props) {
    window.history.replaceState({},
      document.title,
      window.location.pathname + window.location.hash,
    );
    super(props);
    let locale = localStorage.getItem('locale');
    if (!locale) {
      locale = 'zh-CN';
      localStorage.setItem('locale', locale);
    }

    const userAgent = window.navigator.userAgent.toUpperCase();
    const pathname = this.props.location.pathname+this.props.location.search;
    const url = encodeURIComponent("http://www.minigene.net/#"+(pathname));
    if (userAgent.indexOf("MICROMESSENGER") != -1 && !cookie.load('openid')) {
      window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4eed462fe65d3bdb&redirect_uri='+encodeURIComponent("http://www.minigene.net/api/mobile/weixin/getOauth")+'&response_type=code&scope=snsapi_userinfo&state='+url+'#wechat_redirect';
    }

    this.state = {
      locale,
      height: 0,
      pathname: props.location.pathname,
      nav: ['/index','/buy','/report/list','/user'],
    };
  }

  componentDidMount() {
    if (navigator.platform.indexOf('Win') > -1) {
      document.body.classList.add('windows');
    }
    this.setState({
      height: (this.refs.tabBarTmp ? parseInt(this.refs.tabBarTmp.offsetHeight) : 0),
    });
  }
  componentDidUpdate(){
    this.setState({
      height: (this.refs.tabBarTmp ? parseInt(this.refs.tabBarTmp.offsetHeight) : 0),
    });
  }
  renderContent = page => {
    this.props.router.push(page);
  }

  render() {
    const pathname = this.props.location.pathname;

    let navState = false;
    this.state.nav.map(item => {
      if(item === pathname) {
        navState = true;
      }
      return item;
    });

    const height = navState ? this.state.height : 0;

    const content = navState ? <div className="overflow-scrolling fixed buy-warp" style={{overflowX: 'scroll',height: document.documentElement.clientHeight - height}}>
      {this.props.children}
    </div> : this.props.children;
    const navTmp = navState ? <div ref="tabBarTmp" className="fixed tabBarTmp-warp" >
      <TabBarItem page={pathname} render={this.renderContent}  />
    </div> : '';
    return (
      <div className="App" style={{minHeight : document.documentElement.clientHeight}}>
        {content}
        {navTmp}
      </div>
    );
  }
}

export default translate()(connect((state, ownProps) => ({
  children: ownProps.children,
}), () => ({
  actions: {
  },
}))(toJS(App)));
