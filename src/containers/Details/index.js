import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import React, { PureComponent } from 'react';

import toJS from '../../libs/toJS';
import TabBarItem from '../../components/TabBarItem';
import './index.less';

class Details extends PureComponent {

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
      sValue:'',
      date:'',
    };
  }

  componentDidMount() {
    if (navigator.platform.indexOf('Win') > -1) {
      document.body.classList.add('windows');
    }
  }

  renderContent = page => {
    this.props.router.push(page);
  }

  render() {
    return (
      <div className="details" >
        <div style={{overflowX: 'scroll',height: document.documentElement.clientHeight - (this.refs.tabBarTmp ? this.refs.tabBarTmp.offsetHeight : 50)}}>
          <div className="details1"></div>
          <div className="details2"></div>
          <div className="details3"></div>
          <div className="details4"></div>
          <div className="footerBtn">
            【原价99元，限时优惠秩序59元】<br/>
            立即购买
          </div>
        </div>
        <div ref="tabBarTmp">
          <TabBarItem page='details' render={this.renderContent} />
        </div>
      </div>
    );
  }

}

export default translate()(connect((state, ownProps) => ({
  children: ownProps.children,
}), () => ({
  actions: {
  },
}))(toJS(Details)));
