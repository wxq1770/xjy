import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { bindActionCreators } from 'redux';
import React, { PureComponent } from 'react';
import { NavBar, Icon, Checkbox, Popover, Toast, Modal } from 'antd-mobile';
import { createForm } from 'rc-form';
import BuyAccount from '../../components/BuyAccount';
import toJS from '../../libs/toJS';
import QueueAnim from 'rc-queue-anim';
import { BeatLoader } from 'react-spinners';
import {
  historyPerson,
  geneGoodsList,
  buyReducer,
  total,
} from './actions';
import './index.less';
const alert = Modal.alert;
const AgreeItem = Checkbox.AgreeItem;

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
      total: 0,
      discount_amount:0,
      goods_id : this.props.params.goods_id ? parseInt(this.props.params.goods_id) : '',
      baseBill: {
        real_name: '',
        real_name_status:false,
        num: 1,
        bind_id: '',
        disabled: false,
        product: [],
      },
      billsList: [],
      loadingStatus: true,
      historyPerson: [],
      headerStatus: window.location.hash.indexOf('#/buyproduct') > -1  ? false : true,
    };
  }
  componentDidMount = async () => {
    const { actions } = this.props;
    const { goods_id } = this.state;
    let cur = [];
    let obj = [];
    if (navigator.platform.indexOf('Win') > -1) {
      document.body.classList.add('windows');
    }
    try {
      const { value: { status, data }} = await actions.historyPerson({
        body: {},
      });
      this.setState({
        historyPerson: status === 1 ? data.list : [],
      });

      if (this.props.buyReducer.length > 0) {
        this.props.buyReducer.map(item => {
          if (item.bind_id !== '') {
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
          let discount_amount = 0;
          baseBill.product = data.list.map(item => {
            item['checked'] = goods_id === item.goods_id || item['checked']  ? true : goods_id === '' ? true : false;
            item['showDetail'] = item['showDetail'] ? item['showDetail'] : true;
            return item;
          });
          obj.map(item=>{
            item.product.map(key=>{
              if(key.checked){
                discount_amount = discount_amount+parseFloat(key.discount_amount);
              }
              return key;
            });
            return item;
          });
          
          this.setState({
            cur,
            billsList: obj,
            loadingStatus:false,
            discount_amount,
            baseBill,
          });
        } catch (error) {
          // 处理登录错误
          throw error;
        }
      } else if (this.props.params.historyId && this.props.params.historyId!=='null') {
        try {
          const { value: { status, msg, data }} = await actions.geneGoodsList({
            body: {},
          });
          const baseBill = this.state.baseBill;
          const historyPerson = this.state.historyPerson;
          const billsList = [];
          let discount_amount = 0;
          baseBill.product = data.list.map(item => {
            discount_amount = discount_amount+parseFloat(item.discount_amount);
            item['checked'] = goods_id === item.goods_id || item['checked']  ? true : goods_id === '' ? true : false;
            item['showDetail'] = item['showDetail'] ? item['showDetail'] : true;
            return item;
          });
          billsList.push(JSON.parse(JSON.stringify(baseBill)));

          Toast.hide();
          this.setState({
            billsList,
            discount_amount,
            loadingStatus:false,
          });
          this.clickName(historyPerson.filter(item => item.bind_id === parseInt(this.props.params.historyId))[0]);
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
          let discount_amount = 0;
          baseBill.product = data.list.map(item => {
            discount_amount = discount_amount+parseFloat(item.discount_amount);
            item['checked'] =  goods_id === item.goods_id || item['checked']  ? true : goods_id === '' ? true : false;
            item['showDetail'] = item['showDetail'] ? item['showDetail'] : true;
            return item;
          });
          baseBill['real_name'] = '检测人'+(billsList.length+1);
          billsList.push(JSON.parse(JSON.stringify(baseBill)));
          Toast.hide();
          this.setState({
            billsList,
            discount_amount,
            loadingStatus:false,
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
    let array = this.state.cur;
    let billsListArray = [];
    let discount_amount = 0;
    let { baseBill, billsList } = this.state;
    let status = true;

    if (billsList[0].bind_id === '' && billsList.length === 1) {
      array.push(item.bind_id);
      billsListArray.push(Object.assign({}, JSON.parse(JSON.stringify(baseBill)), item, { disabled: true,real_name_status:true }));
    } else {
      billsListArray = billsList.filter(key => {
        if (key.bind_id === item.bind_id) {
          status = false;
          array = array.filter(j => {
            if(j === item.bind_id){
              return false;
            }else{
              return true;
            }
          });
          return false;
        }
        return true;
      });
      
      if (status) {
        array.push(item.bind_id);
        billsListArray.push(Object.assign({}, JSON.parse(JSON.stringify(baseBill)), item, { disabled: true, real_name_status:true}));
      }
      if (billsListArray.length === 0) {
        billsListArray[0] = JSON.parse(JSON.stringify(baseBill));
      }
    }

    billsListArray.map((item,index)=>{
      item.product.map(key=>{
        if(key.checked){
          discount_amount = discount_amount+parseFloat(key.discount_amount);
        }
        return key;
      });
      if(item.real_name_status === false){
        item.real_name = '检测人'+(index+1);
      }
      return item;
    });

    this.setState({
      cur: array,
      billsList:billsListArray,
      discount_amount:discount_amount,
    });
  }
  addBill = () => {
    const baseBill = this.state.baseBill;
    let discount_amount = 0;
    let array = [];
    baseBill.product.map(item=>{
      item['checked'] = true;
      return item;
    });
    this.state.billsList.map((item,i) => {
      item['num'] = i;
      array.push(item);
      return true;
    });
    baseBill['real_name'] = '检测人'+(this.state.billsList.length+1);
    array.push(JSON.parse(JSON.stringify(baseBill)));
    array.map(item=>{
      item.product.map(item=>{
        if(item.checked){
          discount_amount = discount_amount+ parseFloat(item.discount_amount);
        }
        return item;
      });
      return item;
    });

    this.setState({
      billsList: array,
      discount_amount,
    });
  }
  editName = (item, i) => {
    if(item.bind_id){
      return false;
    }
    
    const { billsList } = this.state;
    const array = [];
    billsList.map((key, j) => {
      if (j === i) {
        key['disabled'] = !item.disabled;
      }
      array.push(key);
      return true;
    });
    this.setState({
      billsList: array,
    });
  }
  onChangeName = (e, item, i) => {
    const { billsList } = this.state;
    const array = [];
    billsList.map((key, j) => {
      if (j === i) {
        key['real_name'] = e.target.value;
        key['real_name_status'] = true;
      }
      array.push(key);
      return true;
    });
    this.setState({
      billsList: array,
    });
  }
  onSaveName = (item, i) => {
    const { billsList } = this.state;
    const array = [];

    if(item.real_name === ''){
      Toast.info('检测人备注不能为空', 3);
      return false;
    }
   
    billsList.map((key, j) => {
      if (j === i) {
        key['disabled'] = !item.disabled;
      }
      array.push(key);
      return true;
    });
    this.setState({
      billsList: array,
    });
  }
  onDelUser = (item, i) => {
    const { billsList, cur, baseBill } = this.state;
    let arrayBillsList = [];
    let arrayCur = [];
    let { discount_amount } = this.state;
    item.product.map(item=>{
      discount_amount = parseFloat(discount_amount) - parseFloat(item.discount_amount);
      return item;
    });

    if (billsList.length === 1) {
      arrayBillsList[0] = JSON.parse(JSON.stringify(baseBill));
    } else {
      arrayBillsList = billsList.filter((key, j) => {
        if (j === i) {
          return false;
        }
        return true;
      });
      arrayCur = cur.filter(key => {
        if (key === item.bind_id) {
          return false;
        }
        return true;
      });
    }
    arrayBillsList.map((item,index) => {
      if(item.real_name_status === false){
        item.real_name = '检测人'+(index+1);
      }
      return item;
    });

    this.setState({
      billsList: arrayBillsList,
      cur: arrayCur,
      discount_amount,
    });
  }
  countTotal = () => {
    const { billsList } = this.state;
    let total = 0;
    let array = [];
    billsList.map(item => {
      item.product.map(key => {
        if (key.checked === true) {
         total = parseFloat(parseFloat(total + parseFloat(key.shop_price) - parseFloat(key.discount_amount) - 0).toFixed(2));
        }
      });
      array.push(item);
      return true;
    });

    return {
      total : total.toString().substring(0,parseFloat(total).toFixed(3).lastIndexOf('.')+3),
      item: array,
    };
  }
  onChangeChecked = (e, i, j) => {
    let { discount_amount } = this.state;
    const billsList = this.state.billsList;
    
    const billsListArr = billsList.map((item, k) => {
      if (k === i) {
        item.product[j].checked = e.target.checked;
        if(e.target.checked){
          discount_amount = parseFloat(discount_amount) + parseFloat(item.product[j].discount_amount);
        }else{
          discount_amount = parseFloat(discount_amount) - parseFloat(item.product[j].discount_amount);
        }
      }
      return item;
    });
    this.setState({
      billsList: billsListArr,
      discount_amount,
    });
  }
  onClickXiaLa = (i, j) => {
    const billsList = this.state.billsList;
    const billsListArr = billsList.map((item, k) => {
      if (k === i) {
        item.product[j].showDetail = !item.product[j].showDetail;
      }
      return item;
    });
    this.setState({
      billsList: billsListArr,
    });
  }
  submit = item => {
    const { actions } = this.props;
    const length = 0;
    //let status = false;
    let title = '';
    let num =0;
    let cur = [];
    if(parseFloat(this.countTotal().total) === 0){
      Toast.info('请先选择检测产品', 3);
    }else{
      item.map((key,index) => {
        let status = false;
        key.product.map(item => {
          if(item.checked === true){
            status = true;
          }
        });
        if(status === false){
          title = key.real_name;
          num++;
        }else{
          cur.push(key);
        }
        if(key.real_name === ''){
          key.real_name = '检测人'+(index+1);
          key.real_name_status = false;
        }
        return key;
      });

      if(title!==''){
        alert('Delete', <div>亲，有 <span style={{color:'#2ABEC4'}}>{num}个</span> 检测人还未选择产品<br/>“确认提交”后自动忽略</div>, [
          { text: '再去看看', onCancel: () => console.log('cancel') },
          { text: '确认提交', onPress: () => {this.onPress(cur)} },
        ])
      }else{
        actions.total(this.countTotal().total);
        actions.buyReducer(item);
        this.props.router.push('/address');
      }
    }
  }
  onPress = item => {
    const { actions } = this.props;
    actions.total(this.countTotal().total);
    actions.buyReducer(item);
    this.props.router.push('/address');
  }
  scrollIntoView = e => {
    // setTimeout(()=>{
    //   e.target.scrollIntoView(true);
    // },100);
  }
  render() {
    const {
      historyPerson,
      cur,
      billsList,
      discount_amount,
      headerStatus,
    } = this.state;
    const historyPersonTmp = historyPerson.map((item, i) => {
      let status = false;
      cur.map(k=>{
        if(k === item.bind_id){
          status = true;
        }
        return k;
      });
      return <span key={i} className={(status ? 'cur' : '')} onClick={() => this.clickName(item)}>{item.relation === 1 ? item.real_name+' (本人)' : item.real_name}</span>;
    });

    const billsListTmp = billsList.map((item, i) => {
      const product = item.product.map((key, j) => {
          const detail = key.attribute.map((obj, m) => {
            return <li key={m}>
              <span className="b-b-d-name">{obj.name}</span>
              <span className="b-b-d-value">{obj.description}</span>
            </li>;
          });
        return <div className="buy-bills-warp" key={j}>
          <div className="buy-bills-content">
            <span className="buy-bills-title"><AgreeItem onChange={e => this.onChangeChecked(e, i, j)} key={j} defaultChecked={key.checked}>{key.goods_name}</AgreeItem></span>
            <Icon type="down" className={(key.showDetail ? 'xuanzhuan2' : "xuanzhuan")} onClick={() => this.onClickXiaLa(i, j)}/>
            <span className="buy-bills-money" onClick={() => this.onClickXiaLa(i, j)}>￥{key.shop_price}元</span>
          </div>
          <QueueAnim
            duration={300}
            animConfig={[
              { height: ['auto', 0]},
              { height: ['auto', 0]},
            ]}>
              {key.showDetail ? [<ul className={"buy-bills-detail"} key={1}>
                <QueueAnim type={['right', 'right']} leaveReverse={key.showDetail ? false : true} ease={['easeOutQuart', 'easeOutQuart']}>{key.showDetail ? [detail] : null}</QueueAnim>
              </ul>] : null}
          </QueueAnim>
        </div>;
      });

      const editName = <div className={"animated "+(item.disabled ? 'pulse' : '')}>{item.disabled ? 
          <div className="buy-bills-showname" onClick={() => this.editName(item, i)}>
            <strong>{item.real_name}</strong>
            <span className="icon icon-bianji" style={{display:(item.bind_id === '' ? 'block' : 'none')}}></span>
          </div>
        :
          <div className="buy-bills-input">
            <input type="text" value={item.real_name} onChange={e => this.onChangeName(e, item, i)} onClick={this.scrollIntoView} />
            <span onClick={() => this.onSaveName(item, i)}>保存</span>
          </div>}
      </div>;

      return <QueueAnim key={i}>
        <div className="buy-bills" key={i}>
          <div className="buy-bills-header">
            {editName}
            <span className="buy-bill-user-del" style={{display:(billsList.length === 1 && !item.bind_id)?'none':'block'}} onClick={this.onDelUser.bind(this,item,i)}>删除</span>
          </div>
          <div className="buy-bills-list">
            {product}
          </div>
        </div>
      </QueueAnim>;
    });

    const headerTmp = headerStatus ? <div className="header">购买</div> : <NavBar
      mode="dark"
      icon={<Icon type="left" />}
      onLeftClick={() => window.history.go(-1)}
    >购买</NavBar>;
    return (
      <div className="buy">
        {headerTmp}
        <div className={'page-loading animated '+(this.state.loadingStatus ? 'fadeInDown' : 'fadeOutDown')}>
          <BeatLoader color={'#2ABEC4'} loading={true} />
        </div>
        <div className="yangbenbao"></div>
        <div className={'buy-inspector animated '+(historyPerson.length > 0 ? 'fadeIn' : '')} style={{display: historyPerson.length > 0 ? 'block' : 'none'}}>
          <h2><span>历史检测人</span><Popover
              overlayClassName="animated fadeIn"
              visible={false}
              placement={'right'}
              overlay={[
                (<div className="popover-div">与本账号有关联并有过的报告<br/>的检测人</div>)
              ]}
              align={{
                overflow: { adjustY: 1, adjustX: 1 },
                offset: [10, -2],
              }}
            >
              <span className="icon icon-wenhao" onClick={e=>{}}></span>
            </Popover></h2>
          <div className='buy-inspector-lable '>
            {historyPersonTmp}
          </div>
        </div>
        <div className="buy-content" style={{marginTop: historyPerson.length > 0 ? '0.2rem' : '0.2rem' }}>
          {billsListTmp}
        </div>
        <div className="buy-bill-add">
          <div className="buy-bill-add-content" onClick={this.addBill}>新增检测人</div>
        </div>
        <BuyAccount total={this.countTotal()} discountAmount={discount_amount} submit={this.submit}/>
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
    buyReducer: bindActionCreators(buyReducer, dispatch),
    total: bindActionCreators(total, dispatch),
  },
}))(toJS(Buy))));
