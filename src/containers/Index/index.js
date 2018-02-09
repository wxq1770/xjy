import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
// import { bindActionCreators } from 'redux';
import React, { PureComponent } from 'react';

import TabBarItem from '../../components/TabBarItem';
import toJS from '../../libs/toJS';

import './index.less';


class Index extends PureComponent {

  constructor(props) {
    window.history.replaceState({},
      document.title,
      window.location.pathname + window.location.hash,
    );
    super(props);
    console.log(this.props,'333');
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
  render() {
    return (
      <div className="index" >
        <div className="index-content" style={{overflowX: 'scroll',height: document.documentElement.clientHeight - (this.refs.tabBarTmp ? this.refs.tabBarTmp.offsetHeight : 50)}}>
          <div className="header">
            <div className="header-content">
              <h4>
                小基因，第一次测的基因
              </h4>
              <p>
                正经的科学也很有趣<br/>
                进一步了解
              </p>
            </div>
            <div className="header-item">
             <div className="header-item-bj"></div>
              <div className="header-item-content">
                <span className="header-item-1">点我试试</span>
                <span className="header-item-2">点我试试</span>
                <span className="header-item-3">点我试试</span>
              </div>
            </div>
          </div>
          <div className="banner">
            <div></div>
          </div>
          <div className="indexfocus"></div>
          <div className="list">
            <div className="list-item clearfix">
              <img src="" className="list-item-img" />
              <div className="list-item-warp ">
                <span className="list-item-warp-title">让你秒懂染色体、DNA、基因的关系</span>
                <span className="list-item-warp-content">
                  这里可以加一些文字内容，要不然会显得空
                </span>
              </div>
            </div>
            <div className="list-item clearfix">
              <img src="" className="list-item-img" />
              <div className="list-item-warp ">
                <span className="list-item-warp-title">让你秒懂染色体、DNA、基因的关系</span>
                <span className="list-item-warp-content">
                  这里可以加一些文字内容，要不然会显得空
                </span>
              </div>
            </div>
            <div className="list-item clearfix">
              <img src="" className="list-item-img" />
              <div className="list-item-warp ">
                <span className="list-item-warp-title">让你秒懂染色体、DNA、基因的关系</span>
                <span className="list-item-warp-content">
                  这里可以加一些文字内容，要不然会显得空
                </span>
              </div>
            </div>
          </div>
        </div>
        <div ref="tabBarTmp">
          <TabBarItem page='index' render={this.renderContent}  />
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
}))(toJS(Index)));
