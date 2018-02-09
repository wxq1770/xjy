import React, { PureComponent } from 'react';
import { TabBar } from 'antd-mobile';
import './index.less';

class TabBarItem extends PureComponent {

  constructor(props) {
    window.history.replaceState({},
      document.title,
      window.location.pathname + window.location.hash,
    );
    super(props);
  }

  renderContent = (page) => {
    this.props.render(page);
  }
  
  render() {
    return (
    <TabBar
        unselectedTintColor="#7a7a7a"
        tintColor="#1f69b4"
      >
        <TabBar.Item
          title={'首页'}
          icon={
            <div style={{
              width: '22px',
              height: '22px',
              background: 'url(../../../../img/beijing.png) center center /  21px 21px no-repeat' }}
            />
          }
          selectedIcon={
            <div style={{
              width: '22px',
              height: '22px',
              background: 'url(../../../../img/beijing.png) center center /  21px 21px no-repeat' }}
            />
          }
          selected={this.props.page === 'index'}
          onPress={this.renderContent.bind(this,'/index')}
        >
        </TabBar.Item>
        <TabBar.Item
          title={'购买'}
          icon={
            <div style={{
              width: '22px',
              height: '22px',
              background: 'url(../../../../img/beijing.png) center center /  21px 21px no-repeat' }}
            />
          }
          selectedIcon={
            <div style={{
              width: '22px',
              height: '22px',
              background: 'url(../../../../img/beijing.png) center center /  21px 21px no-repeat' }}
            />
          }
          selected={this.props.page === 'buy'}
          onPress={this.renderContent.bind(this,'/buy')}
        >
        </TabBar.Item>
        <TabBar.Item
          title={'报告'}
          icon={
            <div style={{
              width: '22px',
              height: '22px',
              background: 'url(../../../../img/beijing.png) center center /  21px 21px no-repeat' }}
            />
          }
          selectedIcon={
            <div style={{
              width: '22px',
              height: '22px',
              background: 'url(../../../../img/beijing.png) center center /  21px 21px no-repeat' }}
            />
          }
          selected={this.props.page === 'details'}
          onPress={this.renderContent.bind(this,'/details')}
        >
        </TabBar.Item>
        <TabBar.Item
          title={'我的'}
          icon={
            <div style={{
              width: '22px',
              height: '22px',
              background: 'url(../../../../img/beijing.png) center center /  21px 21px no-repeat' }}
            />
          }
          selectedIcon={
            <div style={{
              width: '22px',
              height: '22px',
              background: 'url(../../../../img/beijing.png) center center /  21px 21px no-repeat' }}
            />
          }
          selected={this.props.page === 'user'}
          onPress={this.renderContent.bind(this)}
        >
        </TabBar.Item>
      </TabBar>
    );
  }
}

export default TabBarItem;
