import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { bindActionCreators } from 'redux';
import React, { PureComponent } from 'react';
import moment from 'moment';
import { NavBar, Icon, Picker, List, InputItem, Toast, DatePicker, ActionSheet } from 'antd-mobile';
import { createForm } from 'rc-form';
import toJS from '../../libs/toJS';

import {
  binding,
  unbindList,
  getSignPackage,
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
const relation = [{
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
}];

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
      sex: '',
      nation: '',
      birthday: '',
      sValue: '',
      date: '',
      checkCode: [],
    };
  }

  componentDidMount = async () => {
    if (navigator.platform.indexOf('Win') > -1) {
      document.body.classList.add('windows');
    }
    const { actions } = this.props;
    let array = [];
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
          Toast.info(getFieldError('relation'), 2);
        }else if(error.sex){
          Toast.info(getFieldError('sex'), 2);
        }else if(error.nation){
          Toast.info(getFieldError('nation'), 2);
        }else if(error.birthday){
          Toast.info(getFieldError('birthday'), 2);
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
        this.props.router.push('/result/binding/succeed');
      } else {
        Toast.info(msg, 2);
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
      array.push(data.map(item => '昵称：'+item.remark+'检测密码：'+item.check_code));
    }
    //array = ['昵称：张三 检测密码：123102301','昵称：张三 检测密码：123102301'];
    const BUTTONS = array;
    BUTTONS.push('取消');

    ActionSheet.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: BUTTONS.length - 1,
      message: '请选择已有的检测密码',
      maskClosable: true,
      'data-seed': 'logId',
      wrapProps,
    },
    (buttonIndex) => {
      const text = array[buttonIndex];
      if(text !== '取消'){
        this.props.form.setFieldsValue({
          check_code : text.split('：')[2],
        });
      }
    });
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
  render() {

    const { getFieldProps, getFieldError } = this.props.form;

    return (
      <div className="binding">
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.router.push('/')}
          rightContent={<span onClick={() => this.props.router.push('/bindingrecord')}>绑定记录</span>}>
          购买
        </NavBar>
        <div className="form-style-1">
          <div className="form-style-1-item">
            <label>样本码</label>
            <div className="form-style-1-input">
              <InputItem
                {...getFieldProps('sample_code',
                  {
                    rules: [{ required: true, message: '请输入样本码' }],
                  },
                )}
                clear
                placeholder="样本码"
                error={getFieldError('sample_code')}
                onErrorClick={()=>{Toast.info(getFieldError('sample_code'), 2)}}
                onChange={(v) => {this.onChange('sample_code', v)}}
                maxLength={20} >
              </InputItem>
              <span className="form-style-1-input-btn" onClick={this.scanQRCode}>扫一扫</span>
            </div>
          </div>
          <div className="form-style-1-item">
            <label>检测密码</label>
            <div className="form-style-1-input">
              <InputItem
                {...getFieldProps('check_code',
                  {
                    rules: [{ required: true, message: '请输入检测密码' }],
                  },
                )}
                clear
                placeholder="检测密码"
                error={getFieldError('check_code')}
                onErrorClick={()=>{Toast.info(getFieldError('check_code'), 2)}}
                onChange={(v) => {this.onChange('check_code', v)}}
                maxLength={20} >
              </InputItem>
              <span className="form-style-1-input-btn" onClick={this.checkCode}>查看</span>
            </div>
          </div>
          <div className="form-style-1-item">
            <label>检测人姓名</label>
            <div className="form-style-1-input-1">
              <InputItem
                {...getFieldProps('real_name',
                  {
                    rules: [{ required: true, message: '请输入检测人姓名' }],
                  },
                )}
                clear
                placeholder="检测人姓名"
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
                rules: [{ required: true, message: '请选择与本人关系' }],
              },
            )}
            cols={1}
            data={relation}
            className="forss"
            extra="请选择与本人关系"
            onOk={v => this.setState({ relation: v })}>
            <List.Item arrow="horizontal">与本人关系</List.Item>
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
            title="选择出生日期"
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
  },
}))(toJS(Binding))));
