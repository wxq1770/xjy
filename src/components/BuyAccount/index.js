import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import { Popover } from 'antd-mobile';
import './index.less';

const Item = Popover.Item;

class BuyAccount extends PureComponent {
  constructor(props) {
    window.history.replaceState({},
      document.title,
      window.location.pathname + window.location.hash,
    );
    super(props);
    this.state = {
      submitting: false,
    };
  }

  componentDidMount() {
    if (navigator.platform.indexOf('Win') > -1) {
      document.body.classList.add('windows');
    }
  }
  submitForm = (item) => {
    this.props.submit(item);
  }
  render() {
    const {
      submitting,
    } = this.state;
    const {
      total,
      item,
    } = this.props.total;
    return (
      <div className="buy-account">
        <ul className="buy-account-list">
          <li className="buy-account-item">
            <span className="buy-account-item-label">合计</span>
            <span className="buy-account-item-value">{total}元</span>
          </li>
          <li className="buy-account-item">
            <span className="buy-account-item-label">运费</span>
            <span className="buy-account-item-value">小基因包邮往返运费</span>
          </li>
          <li className="buy-account-item">
            <span className="buy-account-item-label"><span className="b-a-i-l-label">限时优惠</span><Popover
              overlayClassName="fortest"
              visible={false}
              overlay={[
                (<div className="popover-div">哈哈哈哈哈哈哈哈哈哈哈哈哈</div>)
              ]}
              align={{
                overflow: { adjustY: 0, adjustX: 1 },
                offset: [13, 10],
              }}
            >
              <span className="icon icon-wenhao"></span>
            </Popover></span>
            <span className="buy-account-item-value">-40元</span>
          </li>
        </ul>
        <dl className="buy-account-money">
          <dt>实际支付</dt>
          <dd>
            <span className="buy-account-money-num">￥{total ? total : 0}</span>
            <span className="buy-account-btn" onClick={this.submitForm.bind(this,item)}>提交</span>
          </dd>
        </dl>
      </div>
    );
  }

}

export default BuyAccount;
