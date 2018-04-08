import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import React, { PureComponent } from 'react';
import { NavBar, Icon } from 'antd-mobile';

import toJS from '../../../libs/toJS';
import './index.less';

class FirstSale extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
  }

  constructor(props) {
    window.history.replaceState({},
      document.title,
      window.location.pathname + window.location.hash,
    );
    super(props);
    this.state = {
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

  buy = ()=>{
    window.scrollTo(0,0);
    this.props.router.push('/buyproduct');
  }

  render() {
    return (
      <div className="first-sale">
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => window.history.go(-1)}
        >首发优惠</NavBar>
        <div className="first-sale-1"></div>
        <div className="first-sale-2"></div>
        <div className="first-sale-3"></div>
        <div className="first-sale-4"></div>
        <div className="first-sale-5"></div>
        <div className="first-sale-6"></div>
        <div className="first-sale-7"></div>
        <div className="first-sale-btn" onClick={this.buy}>立即抢购</div>
      </div>
    );
  }
}

export default translate()(connect((state, ownProps) => ({
  children: ownProps.children,
}), () => ({
  actions: {
  },
}))(toJS(FirstSale)));
