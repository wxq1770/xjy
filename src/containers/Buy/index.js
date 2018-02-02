import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { bindActionCreators } from 'redux';
import React, { PureComponent } from 'react';
import { NavBar, Icon, Checkbox, Popover } from 'antd-mobile';
import { createForm } from 'rc-form';
import BuyAccount from '../../components/BuyAccount';

import toJS from '../../libs/toJS';
import {
  mobileExist,
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
      cur:[],
      editIdArr:[],
      total:0,
      sale:40,
      baseBill:{
        name : '',
        userId : '',
        disabled : false,
        product : [{
          id:1,
          title : '神奇小体验1',
          money : 99,
          checked : true,
          showDetail : false,
          detail : [{
            name : '酒精耐受度1',
            value: '喝多少酒会脸红1'
          },{
            name : '脑容量1',
            value: '你脑袋究竟有多大1'
          },{
            name : '创造力1',
            value: '你是创造者1'
          }]
        },{
          id:2,
          title : '神奇小体验2',
          money : 99,
          checked : true,
          showDetail : false,
          detail : [{
            name : '酒精耐受度2',
            value: '喝多少酒会脸红2'
          },{
            name : '脑容量2',
            value: '你脑袋究竟有多大2'
          },{
            name : '创造力2',
            value: '你是创造者2'
          }]
        }]
      },
      billsList : [],
      historyName : [{
        userId : 1,
        name:'张三'
      },{
        userId : 2,
        name:'李四'
      },{
        userId : 3,
        name:'王五'
      }],
    };
  }
  
  componentDidMount() {
    if (navigator.platform.indexOf('Win') > -1) {
      document.body.classList.add('windows');
    }
    const baseBill = this.state.baseBill;
    const billsList = []
    billsList.push(JSON.parse(JSON.stringify(baseBill)));

    this.setState({
      billsList : billsList
    })
  }
  clickName = (item) => {
    let array = this.state.cur.map((item)=>{return item});
    let {baseBill,billsList} = this.state;
    let status = true;

    if(billsList[0].userId === '' && billsList[0].name === '' && billsList.length === 1){
      array.push(item.userId);
      billsList[0] = Object.assign({},JSON.parse(JSON.stringify(baseBill)),item,{disabled:true})
    }else{
      billsList = billsList.filter((key)=>{
        if(key.userId === item.userId){
          status = false;
          array = array.filter((j)=>{
            if(j === item.userId){
              return false
            }else{
              return true
            }
          });
          return false
        }else{
          return true;
        }
      })
      if(status){
        array.push(item.userId);
        billsList.push(Object.assign({},JSON.parse(JSON.stringify(baseBill)),item,{disabled:true}));
      }
      if(billsList.length === 0){
        billsList[0] = JSON.parse(JSON.stringify(baseBill));
      }
    }

    this.setState({
      cur : array,
      billsList : billsList
    })
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
        key['name'] = e.target.value;
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
        if(key === item.userId){
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
    billsList.map((item)=>{
      item.product.map((key)=>{
        if(key.checked === true){
          total = total + key.money - sale;
        }
      })
      return true
    })
    return total
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
  render() {
    const {
      submitting,
      historyName,
      cur,
      billsList,
      editIdArr,
      total
    } = this.state;
    const historyNameTmp = historyName.map((item,i)=>{
      return <span key={i} className={(cur.join().indexOf(item.userId) > -1 ? 'cur' : '')} onClick={this.clickName.bind(this,item)}>{item.name}</span>
    })

    const billsListTmp = billsList.map((item,i)=>{
      const product = item.product.map((key,j)=>{
          const detail = key.detail.map((obj,m)=>{
            return <li key={m}>
              <span className="b-b-d-name">{obj.name}</span>
              <span className="b-b-d-value">{obj.value}</span>
            </li>
          })
        return <div className="buy-bills-warp" key={j}>
          <div className="buy-bills-content">
            <span className="buy-bills-title"><AgreeItem onChange={(e)=>{this.onChangeChecked(e,i,j)}} key={j} defaultChecked={key.checked}>{key.title}</AgreeItem></span>
            <span className="icon icon-xiala" onClick={this.onClickXiaLa.bind(this,i,j)}></span>
            <span className="buy-bills-money" onClick={this.onClickXiaLa.bind(this,i,j)}>￥{key.money}元</span>
          </div>
          <ul className="buuy-bills-detail" style={{display:(key.showDetail?'block':'none')}}>
            {detail}
          </ul>
        </div>
      })

      const editName = item.disabled ? 
        <div className="buy-bills-showname">
          <strong>{item.name}</strong>
          <span className="icon icon-bianji" onClick={this.editName.bind(this,item,i)}></span>
        </div>
      : 
        <div className="buy-bills-input">
          <input type="text" value={item.name} onChange={(e)=>{this.onChangeName(e,item,i)}}/>
          <span onClick={this.onSaveName.bind(this,item,i)}>保存</span>
        </div>
      ;

      return <div className="buy-bills" key={i}>
        <div className="buy-bills-header">
          {editName}
          <span className="buy-bill-user-del" style={{display:(billsList.length === 1 && !item.userId)?'none':'block'}} onClick={this.onDelUser.bind(this,item,i)}>删除</span>
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
          onLeftClick={() => console.log('onLeftClick')}
        >购买</NavBar>
        <div className='buy-inspector'>
          <h2><span>历史检测人</span><Popover
              overlayClassName="fortest"
              visible={false}
              overlay={[
                (<div className="popover-div">哈哈哈哈哈哈哈哈哈哈哈哈哈</div>)
              ]}
              align={{
                overflow: { adjustY: 1, adjustX: 1 },
                offset: [13, 10],
              }}
            >
              <span className="icon icon-wenhao" onClick={e=>{}}></span>
            </Popover></h2>
          <div className='buy-inspector-lable'>
            {historyNameTmp}
          </div>
        </div>
        <div className="buy-content">
          {billsListTmp}
        </div>
        <div className="buy-bill-add">
          <div className="buy-bill-add-content" onClick={this.addBill}>新增检测人</div>
        </div>
        <BuyAccount total={this.countTotal()} />
      </div>
    );
  }
}

export default createForm()(translate()(connect(() => ({
}), dispatch => ({
  actions: {
    mobileExist: bindActionCreators(mobileExist, dispatch),
  },
}))(toJS(Buy))));
