import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { bindActionCreators } from 'redux';
import React, { PureComponent } from 'react';
import { Checkbox,Toast,Button,Modal } from 'antd-mobile';
import { createForm } from 'rc-form';

import toJS from '../../libs/toJS';
import Agree from '../../components/Agree';
import { mobileExist,sendRegCode,register,checkVerifyCode } from './actions';
import './index.less';
import '../../../font/fontello.less';

const AgreeItem = Checkbox.AgreeItem;
const prompt = Modal.prompt;

class Register extends PureComponent {

  constructor(props) {
    window.history.replaceState({},
      document.title,
      window.location.pathname + window.location.hash,
    );
    super(props);
    this.state = {
      submitting: false,
      phone: '',
      phoneError: '',
      captcha: '',
      captchaError: '',
      verify_code:'',
      sendTxt: '获取验证码',
      sendStatus: true,
      sendSecond: 60,
      protocolChecked: true,
      agree:true,
      agreeError:'',
      inviter:'',
      modal: false,
      modal2 : false,
    };
  }

  componentDidMount() {
    if (navigator.platform.indexOf('Win') > -1) {
      document.body.classList.add('windows');
    }
  }

  checkPhone = async e => {
    const phone = e.target.value;
    const { actions } = this.props;
    this.setState({ phone, phoneError: '' });
    if (phone.length === 11 &&
      phone[0] === '1' &&
      phone.indexOf(' ') === -1 &&
      /^[0-9]+$/.test(phone)) {
      try {
        const { value: { status, msg }} = await actions.mobileExist({
          body: {
            mobile: phone,
          },
        });
        if (status !== 0) {
          this.setState({
            phoneError: msg,
          });
        }else{
          this.setState({
            phoneError: '',
          });
        }
      } catch (error) {
        this.setState({
          phoneError: '网络错误',
        });
        throw error;
      }
    }else{
      this.setState({ phone, phoneError: '请输入正确的手机号' });
    }

  }

  changeCaptcha = async e => {
    let captcha = e.target.value;
    this.setState({ captcha, captchaError: '' });
    if (captcha.indexOf(' ') === -1 && captcha.length > 0) {
      this.setState({ captchaError: '' });
    }else{
      this.setState({ captchaError: '请输入短信验证码' });
    }
  }

  sendCode = async () => {
    const { actions } = this.props;
    const { phone, phoneError, sendStatus } = this.state;
    if (phone && !phoneError && sendStatus) {
      try {
        this.setState({
          sendSecond: 60,
          sendStatus: true,
        });
        const { value: { status, msg }} = await actions.sendRegCode({
          body: {
            mobile: phone,
          },
        });
        if(status === 1){
          this.interval = setInterval(() => {
            let count = this.state.sendSecond;
            if (count === 1) {
              clearInterval(this.interval);
              this.setState({
                sendSecond: 60,
                sendTxt: '获取验证码',
                sendStatus: false,
              });
            } else {
              count--;
              this.setState({
                sendSecond: count,
                sendTxt: `${count}s`,
                sendStatus: true,
              });
            }
          }, 1000);
        }else if(status === 1002){
          this.setState({ 
            phoneError: '',
            sendTxt:'获取验证码',
            sendStatus: true,
            modal: true
          });
          this.verifyCodeRef.focus();
        }else{
          Toast.info(msg, 1);
        }
      } catch (error) {
        this.setState({
          sendSecond: 60,
          sendTxt: '获取验证码',
          sendStatus: true
        });
        throw error;
      }
    }else{
      this.setState({
        sendSecond: 60,
        sendTxt: '获取验证码',
        sendStatus: true,
        phoneError:'请输入正确的手机号',
      });
    }
  }
  onClickVerifyCode = e =>{
    e.target.src = "/api/home/api/verifyCode?type=sms_login"
  }
  submit = async () => {
    const { actions, router } = this.props;
    const { phone, phoneError, captcha, captchaError,inviter,agree} = this.state;
    if (phone && !phoneError && captcha && !captchaError && agree) {
      try {
        const { value: { status, msg }} = await actions.register({
          body: {
            mobile : phone,
            sms_code : captcha,
            inviter: inviter,
            agree: agree
          },
        });
        console.log(status,'statusstatusstatus');
        if (status === 1) {
          this.setState({ submitting: true });
        }else{
          Toast.fail(msg, 2);
          this.setState({
            phoneError: msg,
            submitting: false,
          });
        }
      } catch (error) {
        // 处理登录错误
        throw error;
      }
    } else {
      // 判断缺了什么就 focus 哪个输入框
      if (!phone) {
        this.phoneRef.focus();
        this.setState({phoneError:'请输入正确的手机号'})
      }else if(!captcha){
        this.captchaRef.focus();
        this.setState({captchaError:'请输入短信验证码'})
      }else if(!agree){
        this.setState({agreeError:'请选择小基因服务协议'})
      }
    }
  }
  onChangeCaptcha = (e) => {
    this.setState({
      verify_code : e.target.value
    });
  }
  onPress = async () => {
    const { verify_code } = this.state;
    const { actions } = this.props;
    if(verify_code !== ''){
      try {
        const { value: { status, msg }} = await actions.checkVerifyCode({
          body: {
            verify_code : verify_code,
            type : 'sms_reg'
          },
        });
        if (status === 1) {
          this.setState({ submitting: false, modal: false , verify_code:''});
        }else{
          Toast.info(msg, 1);
          this.verifyCodeRef.focus();
          this.setState({
            submitting: true,
          });
        }
        
      } catch (error) {
        throw error;
      }
    }else{
      Toast.info('请输入图形验证码', 1);
    }
  }
  closable = () => {
    this.setState({modal:false})
  }
  onChangeInviter = (e) =>{
    this.setState({inviter:e.target.value})
  }
  onChangeAgree = (e) => {
    if(e.target.checked){
      this.setState({
        agree : e.target.checked,
        agreeError:'',
      })
    }else{
      this.setState({
        agree : e.target.checked,
        agreeError:'请选择小基因服务协议',
      })
    }
  }
  showAgree = () =>{
    this.setState({
      modal2 : true,
    })
  }
  render() {
    const {
      submitting,
      phoneError,
      captchaError,
      sendTxt,
      sendStatus,
      protocolChecked,
      agreeError,
    } = this.state;

    return (
      <div className="register" style={{height: window.screen.height+'px'}}>
        <Modal
          visible={this.state.modal}
          transparent
          maskClosable={true}
          title='提示'
          footer={[{ text: '确定', onPress: this.onPress}]}
          wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        >
          <div>
            <div>发送手机短信超过限制<img className="phone-captcha" onClick={this.onClickVerifyCode} src="/api/home/api/verifyCode?type=sms_login"/></div>
            <input maxLength='4' onChange={this.onChangeCaptcha} ref={r => this.verifyCodeRef = r} className="input-style-1" maxLength='4' />
          </div>
        </Modal>
        <div className="form-style">
          <div className="form-item clearfix">
            <span className="icon icon-shouji" />
            <input
              maxLength="11"
              type="tel"
              disabled={submitting || !sendStatus}
              placeholder="请输入手机号"
              onChange={this.checkPhone}
              ref={r => this.phoneRef = r}
              className="form-item-input w-style-1" />
            <span className="form-send-code"
              onClick={this.sendCode}>{sendTxt}</span>
            {phoneError && <span className="form-error">{phoneError}</span>}
          </div>
          <div className="form-item clearfix">
            <span className="icon icon-yanzhengma" />
            <input
              type="tel"
              placeholder="请输入短信验证码"
              ref={r => this.captchaRef = r}
              className="form-item-input"
              onChange={this.changeCaptcha}
              maxLength="6" />
            {captchaError && <span className="form-error">{captchaError}</span>}
          </div>
          <div className="form-item clearfix">
            <span className="icon icon-shouji" />
            <input
              maxLength="11"
              type="tel"
              placeholder="请输入邀请人手机号"
              onChange={this.onChangeInviter}
              className="form-item-input" />
          </div>
          <div className="form-more">
            <a className="form-txt">已有账号</a>
          </div>
          <button className="form-submit"
            disabled={submitting}
            onClick={this.submit}>立即注册</button>
          <div className="form-protocol">
            <AgreeItem
              defaultChecked={protocolChecked}
              onChange={this.onChangeAgree}
            >
            </AgreeItem>
            <a onClick={this.showAgree}>同意《小基因服务协议》</a>
            {agreeError && <span className="form-error">{agreeError}</span>}
          </div>
        </div>
        <Modal
          popup
          visible={this.state.modal2}
          closable={true}
          maskClosable={true}
          animationType="slide-up"
        >
          <Agree/>
        </Modal>
      </div>
    );
  }
}

export default createForm()(translate()(connect(() => ({
}), dispatch => ({
  actions: {
    mobileExist: bindActionCreators(mobileExist, dispatch),
    sendRegCode: bindActionCreators(sendRegCode, dispatch),
    register: bindActionCreators(register, dispatch),
    checkVerifyCode : bindActionCreators(checkVerifyCode, dispatch),
  },
}))(toJS(Register))));
