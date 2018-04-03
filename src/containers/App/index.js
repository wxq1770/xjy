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
import './animate.css';

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

    this.state = {
      locale,
      height: 0,
      pathname: props.location.pathname,
      nav: ['/index','/buy','/report/list','/user/index'],
    };
  }

  componentDidMount() {
    if (navigator.platform.indexOf('Win') > -1) {
      document.body.classList.add('windows');
    }
    this.setState({
      height: (this.refs.tabBarTmp ? parseInt(this.refs.tabBarTmp.offsetHeight) : 0),
    });
    // 防止内容区域滚到底后引起页面整体的滚动
    var content = this.refs.App;
    var startY;

    content.addEventListener('touchstart', function (e) {
        startY = e.touches[0].clientY;
    });

    content.addEventListener('touchmove', function (e) {
        // 高位表示向上滚动
        // 底位表示向下滚动
        // 1容许 0禁止
        var status = '11';
        var ele = this;

        var currentY = e.touches[0].clientY;

        if (ele.scrollTop === 0) {
            // 如果内容小于容器则同时禁止上下滚动
            status = ele.offsetHeight >= ele.scrollHeight ? '00' : '01';
        } else if (ele.scrollTop + ele.offsetHeight >= ele.scrollHeight) {
            // 已经滚到底部了只能向上滚动
            status = '10';
        }

        if (status != '11') {
            // 判断当前的滚动方向
            var direction = currentY - startY > 0 ? '10' : '01';
            // 操作方向和当前允许状态求与运算，运算结果为0，就说明不允许该方向滚动，则禁止默认事件，阻止滚动
            if (!(parseInt(status, 2) & parseInt(direction, 2))) {
                //stopEvent(e);
            }
        }
    });
  }
  componentDidUpdate(){
    const userAgent = window.navigator.userAgent.toUpperCase();
    const pathname = this.props.location.pathname+this.props.location.search;
    const url = encodeURIComponent("http://www.minigene.net/#"+(pathname));
    if (userAgent.indexOf("MICROMESSENGER") != -1 && !cookie.load('openid')) {
      window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4eed462fe65d3bdb&redirect_uri='+encodeURIComponent("http://www.minigene.net/api/mobile/weixin/getOauth")+'&response_type=code&scope=snsapi_userinfo&state='+url+'#wechat_redirect';
    }
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

    const content = navState ? <div className="main overflow-scrolling buy-warp" style={{height: document.documentElement.clientHeight - height}}>
      {this.props.children}
    </div> : this.props.children;
    const navTmp = navState ? <div ref="tabBarTmp" className="tabBarTmp-warp" >
      <TabBarItem page={pathname} render={this.renderContent}  />
    </div> : '';
    return (
      <div className="App" ref='App' style={{height : document.documentElement.clientHeight}}>
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
