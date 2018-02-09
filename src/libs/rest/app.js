export default {

  // 在这儿定义 API 地址、参数和方法
  helloword: {
    method: 'get',
    url: 'helloword/{{params}}',
  },

  bindList: {
    method: 'post',
    url: 'api/mobile/user/bindList',
  },

  orderInfo: {
    method: 'post',
    url: 'api/mobile/user/orderInfo',
  },

  orderList: {
    method: 'post',
    url: 'api/mobile/user/orderList',
  },

  cancelOrder: {
    method: 'post',
    url: 'api/mobile/order/cancelOrder',
  },

  historyPerson: {
    method: 'post',
    url: 'api/mobile/user/historyPerson',
  },

  geneGoodsList: {
    method: 'post',
    url: 'api/mobile/goods/geneGoodsList',
  },

  addOrder: {
    method: 'post',
    url: 'api/mobile/order/addOrder',
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
  },

  isLogin: {
    method: 'post',
    url: 'api/mobile/user/isLogin',
  },
};
