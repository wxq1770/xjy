import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import React, { PureComponent } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import toJS from '../../libs/toJS';
import './index.less';

class Recommend extends PureComponent {

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
    window.scrollTo(0,0);
    this.props.router.push(page);
  }

  render() {
    return (
      <div className="details" >
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => window.history.go(-1)}
        >
          <span>神奇小体验</span>
        </NavBar>
        <div className="details1"></div>
        <div className="details2"></div>
        <div className="details3"></div>
        <div className="details4"></div>
        <div className="footerBtn" onClick={this.renderContent.bind(this,'/buyproduct')}>
          【原价99元，首发优惠只需59元】<br/>
          <span>立即购买</span>
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
}))(toJS(Recommend)));
