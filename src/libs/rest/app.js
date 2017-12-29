export default {

  // 在这儿定义 API 地址、参数和方法
  helloword: {
    method: 'get',
    url: 'helloword/{{params}}',
  },

  mobileExist: {
    method: 'post',
    url: 'api/mobile/user/mobileExist',
  },

  sendLoginCode: {
    method: 'post',
    url: 'api/home/api/sendLoginCode',
  },

  sendRegCode: {
    method: 'post',
    url: 'api/home/api/sendRegCode',
  },

  loginForm: {
    method: 'post',
    url: 'api/mobile/user/login',
  },

  register: {
    method: 'post',
    url: '/api/mobile/user/register',
  },

  checkVerifyCode: {
    method: 'post',
    url: 'api/home/api/checkVerifyCode',
  }
  
};
