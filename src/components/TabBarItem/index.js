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
        tintColor="#2ABEC4"
      >
        <TabBar.Item
          title={'首页'}
          icon={
            <div className="shouyehui" />
          }
          selectedIcon={
            <div className="shouye" />
          }
          selected={this.props.page === '/index'}
          onPress={this.renderContent.bind(this,'/index')}
        >
        </TabBar.Item>
        <TabBar.Item
          title={'购买'}
          icon={
            <div className="goumaihui" />
          }
          selectedIcon={
            <div className="goumai" />
          }
          selected={this.props.page === '/buy'}
          onPress={this.renderContent.bind(this,'/buy')}
        >
        </TabBar.Item>
        <TabBar.Item
          title={'报告'}
          icon={
            <div className="baogaohui" />
          }
          selectedIcon={
            <div className="baogao" />
          }
          selected={this.props.page === '/report/list'}
          onPress={this.renderContent.bind(this,'/report/list')}
        >
        </TabBar.Item>
        <TabBar.Item
          title={'我的'}
          icon={
            <div className="wodehui" />
          }
          selectedIcon={
            <div className="wode" />
          }
          selected={this.props.page === '/user/index'}
          onPress={this.renderContent.bind(this,'/user/index')}
        >
        </TabBar.Item>
      </TabBar>
    );
  }
}

export default TabBarItem;
