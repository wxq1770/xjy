import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { bindActionCreators } from 'redux';
import React, { PureComponent } from 'react';
import moment from 'moment';
import { NavBar, Icon, Picker, List, InputItem, Toast, DatePicker, Popover, ActionSheet } from 'antd-mobile';
import { createForm } from 'rc-form';
import toJS from '../../libs/toJS';

import {
  binding,
  unbindList,
  getSignPackage,
  selfBinded,
} from './actions';

import './index.less';

const nowTimeStamp = Date.now();
let minDate = new Date(1900, 1, 1);
const maxDate = new Date(nowTimeStamp + 1e7);
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
  wrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}

const sex = [{
  value: '1',
  label: '男',
}, {
  value: '2',
  label: '女',
}];

const nation = [
  {
    value: '1',
    label: '汉族',
  }, {
    value: '2',
    label: '蒙古族',
  }, {
    value: '3',
    label: '回族',
  }, {
    value: '4',
    label: '藏族',
  }, {
    value: '5',
    label: '维吾尔族',
  }, {
    value: '6',
    label: '苗族',
  }, {
    value: '7',
    label: '彝族',
  }, {
    value: '8',
    label: '壮族',
  }, {
    value: '9',
    label: '布依族',
  }, {
    value: '10',
    label: '朝鲜族',
  }, {
    value: '11',
    label: '满族',
  }, {
    value: '12',
    label: '侗族',
  }, {
    value: '13',
    label: '瑶族',
  }, {
    value: '14',
    label: '白族',
  }, {
    value: '15',
    label: '土家族',
  }, {
    value: '16',
    label: '哈尼族',
  }, {
    value: '17',
    label: '哈萨克族',
  }, {
    value: '18',
    label: '傣族',
  }, {
    value: '19',
    label: '黎族',
  }, {
    value: '20',
    label: '傈僳族',
  }, {
    value: '21',
    label: '佤族',
  }, {
    value: '22',
    label: '畲族',
  }, {
    value: '23',
    label: '高山族',
  }, {
    value: '24',
    label: '拉祜族',
  }, {
    value: '25',
    label: '水族',
  }, {
    value: '26',
    label: '东乡族',
  }, {
    value: '27',
    label: '纳西族',
  }, {
    value: '28',
    label: '景颇族',
  }, {
    value: '29',
    label: '柯尔克孜族',
  }, {
    value: '30',
    label: '土族',
  }, {
    value: '31',
    label: '达斡尔族',
  }, {
    value: '32',
    label: '仫佬族',
  }, {
    value: '33',
    label: '羌族',
  }, {
    value: '34',
    label: '布朗族',
  }, {
    value: '35',
    label: '撒拉族',
  }, {
    value: '36',
    label: '毛难族',
  }, {
    value: '37',
    label: '仡佬族',
  }, {
    value: '38',
    label: '锡伯族',
  }, {
    value: '39',
    label: '阿昌族',
  }, {
    value: '40',
    label: '普米族',
  }, {
    value: '41',
    label: '塔吉克族',
  }, {
    value: '42',
    label: '怒族',
  }, {
    value: '43',
    label: '乌孜别克族',
  }, {
    value: '44',
    label: '俄罗斯族',
  }, {
    value: '45',
    label: '鄂温克族',
  }, {
    value: '46',
    label: '崩龙族',
  }, {
    value: '47',
    label: '保安族',
  }, {
    value: '48',
    label: '裕固族',
  }, {
    value: '49',
    label: '京族',
  }, {
    value: '50',
    label: '塔塔尔族',
  }, {
    value: '51',
    label: '独龙族',
  }, {
    value: '52',
    label: '鄂伦春族',
  }, {
    value: '53',
    label: '赫哲族',
  }, {
    value: '54',
    label: '门巴族',
  }, {
    value: '55',
    label: '珞巴族',
  }, {
    value: '56',
    label: '基诺族',
  }];

class Binding extends PureComponent {

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
      relation: '',
      relationArr: [{
        value: '1',
        label: '本人',
      }, {
        value: '2',
        label: '配偶',
      }, {
        value: '3',
        label: '父母',
      }, {
        value: '4',
        label: '祖父母',
      }, {
        value: '5',
        label: '兄弟姐妹',
      }, {
        value: '6',
        label: '子女',
      }, {
        value: '7',
        label: '朋友',
      }, {
        value: '8',
        label: '其它',
      }],
      sex: '',
      nation: '',
      birthday: '',
      sValue: '',
      date: '',
      checkCode: [],
      check_status: false,
      is_binded:0,
      unbindList:[],
      actionSheetStatus:false,
    };
  }

  componentDidMount = async () => {
    if (navigator.platform.indexOf('Win') > -1) {
      document.body.classList.add('windows');
    }

    const { actions } = this.props;
    let array = [];
    this.unbindList();
    this.selfBinded();
    const { value: {status, msg, data }} = await actions.getSignPackage({
      body: {
        url: "http://www.minigene.net/",
      },
    });
    let obj = data || {};
    obj['jsApiList'] = [
      'scanQRCode'
    ];
    obj['debug'] = false;

    window.wx.config(obj);
  }

  selfBinded  = async () => {
    const { actions } = this.props;
    const { relationArr } = this.state;
    const { value: {status, msg, data }} = await actions.selfBinded({
      body: {},
    });
    if(status === 1 && data.is_binded === 1){
      relationArr.shift();
    }
    this.setState({
      is_binded : status === 1 && data.is_binded ? data.is_binded : 0,
      relationArr,
    });
  }

  unbindList = async () => {
    const { actions } = this.props;
    const { value: {status, msg, data }} = await actions.unbindList({
      body: {},
    });

    if(status === 1 && data.list.length > 0){
      this.setState({
        check_status: true,
      });
    }else{
      this.setState({
        check_status: false,
      });
    }
  }

  onChange = (type, value) => {
    const { actions } = this.props;
    this.props.form.setFieldsValue({
      [type]: value,
    });
  }

  submit = async () => {
    const { actions } = this.props;
    const { getFieldProps, getFieldError } = this.props.form;
    let status = false;
    let value = [];
    this.props.form.validateFields((error, item) => {
      if(error){
        if(error.relation){
          Toast.info(getFieldError('relation'), 3);
        }else if(error.sex){
          Toast.info(getFieldError('sex'), 3);
        }else if(error.nation){
          Toast.info(getFieldError('nation'), 3);
        }else if(error.birthday){
          Toast.info(getFieldError('birthday'), 3);
        }
      }
      if (!error) {
        status = true;
        value = item;
      }
    });
    if (status) {
      const { value: {status, msg, data }} = await actions.binding({
        body: {
          sample_code: value.sample_code ? value.sample_code : '',
          check_code: value.check_code ? value.check_code : '',
          real_name: value.real_name ? value.real_name : '',
          relation: value.relation && value.relation[0] ? value.relation[0] : '',
          nation: value.nation && value.nation[0] ? value.nation[0] : '',
          sex: value.sex && value.sex[0] ? value.sex[0] : '',
          birthday: value.birthday ? moment(value.birthday).format('YYYY-DD-MM') : '',
        },
      });
      if (status === 1009) {
        Toast.info('您未登录3秒后自动跳转到登录页面', 3, () => this.props.router.push('/login?target=/binding'));
      } else if (status === 1) {
        this.props.router.push('/result/binding/succeed/'+data.bind_id);
      } else {
        Toast.info(msg, 3);
      }
    }
  }
  checkCode = async () => {
    const { actions } = this.props;
    let array = [];
    const { value: {status, msg, data }} = await actions.unbindList({
      body: {},
    });
    if(status === 1){
      this.setState({
        unbindList: data.list,
        actionSheetStatus:true,
      });
    }
  }
  scanQRCode = () => {
    let that = this;
    window.wx.scanQRCode({
      needResult: 1,
      scanType: ["qrCode","barCode"],
      success: function (res) {
        that.props.form.setFieldsValue({
          sample_code: res.resultStr.split(',')[1],
        });
      }
    });
  }
  select = item =>{
    this.props.form.setFieldsValue({
      check_code : item.check_code
    });
    this.setState({
      actionSheetStatus: false,
    })
  }
  close = () =>{
    this.setState({
      actionSheetStatus: false,
    })
  }
  render() {

    const { getFieldProps, getFieldError } = this.props.form;
    const { check_status, relationArr, unbindList, actionSheetStatus } = this.state;
    const tmp = unbindList.map((item,index)=> {
      return <div className="actionSheet-li" key={index} onClick={this.select.bind(this,item)}>
        <span className="fl"><strong>检测人备注：</strong>{item.remark}</span>
        <span className="fr"><strong>检测密码：</strong>{item.check_code}</span>
      </div>
    });
    return (
      <div className="binding">
        <div className="actionSheet-warp-bj" style={{display:(actionSheetStatus ? 'block' : 'none')}} onClick={this.close}></div>
        <div className={"actionSheet-warp overflow-scrolling animated "+(actionSheetStatus ? 'slideInUp ' : 'slideOutDown' )} style={{maxHeight : document.documentElement.clientHeight}}>
          <div className="actionSheet-warp-header">请根据备注选择检测密码</div>
          {tmp}
        </div>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => window.history.go(-1)}
          rightContent={<span onClick={() => this.props.router.push('/bindingrecord')}>绑定记录</span>}>
          绑定样本
        </NavBar>
        <div className="form-style-1">
          <div className="form-style-1-item">
            <label>样本码</label>
            <div className="form-style-1-input">
              <InputItem
                {...getFieldProps('sample_code',
                  {
                    rules: [{ required: true, message: '请输入/扫一扫样本码' }],
                  },
                )}
                clear
                placeholder="请输入/扫一扫样本码"
                error={getFieldError('sample_code')}
                onErrorClick={()=>{Toast.info(getFieldError('sample_code'), 2)}}
                onChange={(v) => {this.onChange('sample_code', v)}}
                maxLength={20} >
              </InputItem>
              <span className="form-style-1-input-btn" onClick={this.scanQRCode}>扫一扫</span>
            </div>
          </div>
          <div className="form-style-1-item">
            <label className="popover-label"><span className="popover-span">检测密码</span>
            <Popover
              overlayClassName="fortest"
              visible={false}
              placement={'right'}
              overlay={[
                (<div className="popover-div">请向帮您购买产品的亲友索要</div>)
              ]}
              align={{
                overflow: { adjustY: 1, adjustX: 1 },
                offset: [10, -2],
              }}
            >
              <span className="icon icon-wenhao" onClick={e=>{}} style={{display:check_status ?'none':'block' }}></span>
            </Popover>
            </label>
            <div className={check_status ? 'form-style-1-input' : 'form-style-1-input-1'}>
              <InputItem
                {...getFieldProps('check_code',
                  {
                    rules: [{ required: true, message: check_status ? '请选择检测密码' : '请输入检测密码' }],
                  },
                )}
                clear
                placeholder={check_status ? '请选择检测密码' : '请输入检测密码'}
                error={getFieldError('check_code')}
                onErrorClick={()=>{Toast.info(getFieldError('check_code'), 2)}}
                onChange={(v) => {this.onChange('check_code', v)}}
                maxLength={20} >
              </InputItem>
              <span className="form-style-1-input-btn" style={{display:(check_status ? 'block' : 'none')}} onClick={this.checkCode}>查看</span>
            </div>
          </div>
          <div className="form-style-1-item">
            <label>检测人姓名</label>
            <div className="form-style-1-input-1">
              <InputItem
                {...getFieldProps('real_name',
                  {
                    rules: [{ required: true, message: '请输入检测人真实姓名' }],
                  },
                )}
                clear
                placeholder="请输入检测人真实姓名"
                error={getFieldError('real_name')}
                onErrorClick={()=>{Toast.info(getFieldError('real_name'), 2)}}
                onChange={(v) => {this.onChange('real_name', v)}}
                maxLength={20} >
              </InputItem>
            </div>
          </div>

          <Picker
            {...getFieldProps('relation',
              {
                rules: [{ required: true, message: '请选择样本来源' }],
              },
            )}
            cols={1}
            data={relationArr}
            className="forss"
            extra="请选择样本来源"
            onOk={v => this.setState({ relation: v })}>
            <List.Item arrow="horizontal">样本来源</List.Item>
          </Picker>
          <Picker
            {...getFieldProps('sex',
              {
                rules: [{ required: true, message: '请选择性别' }],
              },
            )}
            cols={1}
            data={sex}
            className="forss"
            extra="请选择性别"
            onOk={v => this.setState({ sex: v })}>
            <List.Item arrow="horizontal">性别</List.Item>
          </Picker>

          <Picker
            {...getFieldProps('nation',
              {
                rules: [{ required: true, message: '请选择民族' }],
              },
            )}
            cols={1}
            data={nation}
            className="forss"
            extra="请选择民族"
            onOk={v => this.setState({ nation: v })}>
            <List.Item arrow="horizontal">民族</List.Item>
          </Picker>

          <DatePicker
            {...getFieldProps('birthday',
              {
                rules: [{ required: true, message: '请选择出生日期' }],
              },
            )}
            mode="date"
            title=""
            extra="请选择出生日期"
            minDate={minDate}
            maxDate={maxDate}
            onOk={birthday => this.setState({ birthday })}>
            <List.Item className="lastChild" arrow="horizontal">出生日期</List.Item>
          </DatePicker>
        </div>
        <div className="form-style-1-submit" onClick={this.submit}>立即绑定</div>
      </div>
    );
  }
}

export default createForm()(translate()(connect(() => ({
}), dispatch => ({
  actions: {
    getSignPackage: bindActionCreators(getSignPackage, dispatch),
    binding: bindActionCreators(binding, dispatch),
    unbindList: bindActionCreators(unbindList, dispatch),
    selfBinded: bindActionCreators(selfBinded, dispatch),
  },
}))(toJS(Binding))));
