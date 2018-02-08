import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { bindActionCreators } from 'redux';
import React, { PureComponent } from 'react';
import { NavBar, Icon, Checkbox, Popover } from 'antd-mobile';
import { createForm } from 'rc-form';
import BuyAccount from '../../components/BuyAccount';

import toJS from '../../libs/toJS';
import {
  historyPerson,
  geneGoodsList,
  buyReducer,
  total,
} from './actions';
import './index.less';

const AgreeItem = Checkbox.AgreeItem;
const Item = Popover.Item;

class Buy extends PureComponent {
  constructor(props) {
    window.history.replaceState({},
      document.title,
      window.location.pathname + window.location.hash,
    );
    super(props);
    this.state = {
      submitting: false,
      cur: [],
      editIdArr: [],
      total: 0,
      sale: 40,
      baseBill: {
        real_name: '',
        bind_id: '',
        disabled: false,
        product: [],
      },
      billsList: [],
      historyPerson: [],
    };
  }
  componentDidMount = async () => {
    const { actions } = this.props;
    let cur = [];
    let obj = [];
    if (navigator.platform.indexOf('Win') > -1) {
      document.body.classList.add('windows');
    }
    try {
      const { value: { status, msg, data }} = await actions.historyPerson({
        body: {},
      });

      let historyPersonData = data;
      this.setState({
        historyPerson: historyPersonData,
      });

      if(this.props.buyReducer.length > 0){
        this.props.buyReducer.map(item => {
          if(item.bind_id !== ''){
            cur.push(item.bind_id);
          }
          obj.push(item);
          return item;
        });
        try {
          const { value: { status, msg, data }} = await actions.geneGoodsList({
            body: {},
          });
          const baseBill = this.state.baseBill;
          baseBill.product = data.map(item => {
            item['checked'] = item['checked'] ? item['checked'] : true;
            item['showDetail'] = item['showDetail'] ? item['showDetail'] : false;
            return item;
          });
          this.setState({
            cur,
            billsList: obj,
            baseBill,
          });
        } catch (error) {
          // 处理登录错误
          throw error;
        }
      }else if(this.props.params.historyId){
        try {
          const { value: { status, msg, data }} = await actions.geneGoodsList({
            body: {},
          });
          const baseBill = this.state.baseBill;
          const billsList = [];
          baseBill.product = data.map((item)=>{
            item['checked'] = item['checked'] ? item['checked'] : true;
            item['showDetail'] = item['showDetail']  ? item['showDetail']  : false;
            return item;
          });
          billsList.push(JSON.parse(JSON.stringify(baseBill)));
          this.setState({
            billsList,
          });
          this.clickName(historyPersonData.filter(item => { return item.bind_id === this.props.params.historyId})[0]);
        } catch (error) {
          // 处理登录错误
          throw error;
        }
      }else{
        try {
          const { value: { status, msg, data }} = await actions.geneGoodsList({
            body: {},
          });
          const baseBill = this.state.baseBill;
          const billsList = [];
          baseBill.product = data.map((item)=>{
            item['checked'] = item['checked'] ? item['checked'] : true;
            item['showDetail'] = item['showDetail']  ? item['showDetail']  : false;
            return item;
          });
          billsList.push(JSON.parse(JSON.stringify(baseBill)));

          this.setState({
            billsList,
          });
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
  clickName = item => {
    let array = this.state.cur.map(item => { return item });
    let { baseBill, billsList } = this.state;
    let status = true;

    if(billsList[0].bind_id === '' && billsList[0].real_name === '' && billsList.length === 1){
      array.push(item.bind_id);
      billsList[0] = Object.assign({}, JSON.parse(JSON.stringify(baseBill)), item, { disabled: true });
    }else{
      billsList = billsList.filter(key => {
        if(key.bind_id === item.bind_id){
          status = false;
          array = array.filter(j => (!j === item.bind_id));
          return false;
        }
        return true;
      });
      if(status){
        array.push(item.bind_id);
        billsList.push(Object.assign({}, JSON.parse(JSON.stringify(baseBill)), item, { disabled: true }));
      }
      if(billsList.length === 0){
        billsList[0] = JSON.parse(JSON.stringify(baseBill));
      }
    }
    this.setState({
      cur: array,
      billsList,
    });
  }
  addBill = ()=>{
    const baseBill = this.state.baseBill;
    let array = [];
    this.state.billsList.map((item)=>{ 
      array.push(item);
      return true;
    });
    array.push(JSON.parse(JSON.stringify(baseBill)));
    this.setState({
      billsList : array
    })
  }
  editName = (item,i)=>{
    const { billsList } = this.state;
    const array = [];
    billsList.map((key,j)=>{
      if(j === i){
        key['disabled'] = !item.disabled;
      }
      array.push(key);
      return true;
    })
    this.setState({
      billsList : array
    })
  }
  onChangeName = (e,item,i)=>{
    const { billsList } = this.state;
    const array = [];
    billsList.map((key,j)=>{
      if(j === i){
        key['real_name'] = e.target.value;
      }
      array.push(key);
      return true;
    })
    this.setState({
      billsList : array
    })
  }
  onSaveName = (item,i)=>{
    const { billsList } = this.state;
    const array = [];
    billsList.map((key,j)=>{
      if(j === i){
        key['disabled'] = !item.disabled;
      }
      array.push(key);
      return true;
    })
    this.setState({
      billsList : array
    })
  }
  onDelUser = (item,i) => {
    const { billsList,cur,baseBill } = this.state;
    let arrayBillsList = [];
    let arrayCur = [];
    if(billsList.length === 1){
      arrayBillsList[0] = JSON.parse(JSON.stringify(baseBill));
    }else{
      arrayBillsList = billsList.filter((key,j)=>{
        if(j === i){
          return false
        }
        return true;
      })
      arrayCur = cur.filter((key)=>{
        if(key === item.bind_id){
          return false;
        }
        return true;
      })
    }
    
    this.setState({
      billsList : arrayBillsList,
      cur : arrayCur
    })
  }
  countTotal = ()=>{
    const { billsList,sale } = this.state;
    let total = 0;
    let array = [];
    billsList.map((item)=>{
      item.product.map((key)=>{
        if(key.checked === true){
          total = total + key.shop_price - key.discount_amount;
        }
      })
      array.push(item);
      return true
    })
    return {
      total : total,
      item : array
    }
  }
  onChangeChecked = (e,i,j)=>{
    const billsList = this.state.billsList;
    const billsListArr = billsList.map((item,k)=>{
      if(k === i){
        item.product[j].checked = e.target.checked
      }
      return item
    })
    this.setState({
      billsList : billsListArr
    })
  }
  onClickXiaLa = (i,j) => {
    const billsList = this.state.billsList;
    const billsListArr = billsList.map((item,k)=>{
      if(k === i){
        item.product[j].showDetail = !item.product[j].showDetail;
      }
      return item
    })
    this.setState({
      billsList : billsListArr
    })
  }
  submit = (item) => {
    const { actions } = this.props;
    actions.total(this.countTotal().total);
    actions.buyReducer(item);
    this.props.router.push('/address');
  }
  render() {
    const {
      submitting,
      historyPerson,
      cur,
      billsList,
      editIdArr,
      total
    } = this.state;
    const historyPersonTmp = historyPerson.map((item,i)=>{
      return <span key={i} className={(cur.join().indexOf(item.bind_id) > -1 ? 'cur' : '')} onClick={this.clickName.bind(this,item)}>{item.real_name}</span>
    })

    const billsListTmp = billsList.map((item,i)=>{
      const product = item.product.map((key,j)=>{
          const detail = key.detail.map((obj,m)=>{
            return <li key={m}>
              <span className="b-b-d-name">{obj.goods_remark}</span>
              <span className="b-b-d-value">{obj.goods_content}</span>
            </li>
          })
        return <div className="buy-bills-warp" key={j}>
          <div className="buy-bills-content">
            <span className="buy-bills-title"><AgreeItem onChange={(e)=>{this.onChangeChecked(e,i,j)}} key={j} defaultChecked={key.checked}>{key.goods_name}</AgreeItem></span>
            <span className="icon icon-xiala" onClick={this.onClickXiaLa.bind(this,i,j)}></span>
            <span className="buy-bills-money" onClick={this.onClickXiaLa.bind(this,i,j)}>￥{(key.shop_price-key.discount_amount)}元</span>
          </div>
          <ul className="buuy-bills-detail" style={{display:(key.showDetail?'block':'none')}}>
            {detail}
          </ul>
        </div>
      })

      const editName = item.disabled ? 
        <div className="buy-bills-showname">
          <strong>{item.real_name}</strong>
          <span className="icon icon-bianji" onClick={this.editName.bind(this,item,i)}></span>
        </div>
      : 
        <div className="buy-bills-input">
          <input type="text" value={item.real_name} onChange={(e)=>{this.onChangeName(e,item,i)}}/>
          <span onClick={this.onSaveName.bind(this,item,i)}>保存</span>
        </div>
      ;

      return <div className="buy-bills" key={i}>
        <div className="buy-bills-header">
          {editName}
          <span className="buy-bill-user-del" style={{display:(billsList.length === 1 && !item.bind_id)?'none':'block'}} onClick={this.onDelUser.bind(this,item,i)}>删除</span>
        </div>
        <div className="buy-bills-list">
          {product}
        </div>
      </div>
    })  

    return (
      <div className="buy" style={{height: `${window.screen.height}px`}}>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => window.history.go(-1)}
        >购买</NavBar>
        <div className='buy-inspector' style={{display: historyPerson.length > 0 ? 'block' : 'none'}}>
          <h2><span>历史检测人</span><Popover
              overlayClassName="fortest"
              visible={false}
              overlay={[
                (<div className="popover-div">提示语A</div>)
              ]}
              align={{
                overflow: { adjustY: 1, adjustX: 1 },
                offset: [13, 10],
              }}
            >
              <span className="icon icon-wenhao" onClick={e=>{}}></span>
            </Popover></h2>
          <div className='buy-inspector-lable'>
            {historyPersonTmp}
          </div>
        </div>
        <div className="buy-content">
          {billsListTmp}
        </div>
        <div className="buy-bill-add">
          <div className="buy-bill-add-content" onClick={this.addBill}>新增检测人</div>
        </div>
        <BuyAccount total={this.countTotal()} submit={this.submit}/>
      </div>
    );
  }
}

export default createForm()(translate()(connect((state, ownProps) => ({
  buyReducer : state.getIn(['buyReducer', 'buyReducer'])
}), dispatch => ({
  actions: {
    geneGoodsList: bindActionCreators(geneGoodsList, dispatch),
    historyPerson: bindActionCreators(historyPerson, dispatch),
    buyReducer : bindActionCreators(buyReducer, dispatch),
    total: bindActionCreators(total, dispatch),
  },
}))(toJS(Buy))));
