export default {

  // 在这儿定义 API 地址、参数和方法
  helloword: {
    method: 'get',
    url: 'helloword/{{params}}',
  },
 
  selfBinded: {
    method: 'post',
    url: 'api/mobile/user/selfBinded',
  },

  subscribe: {
    method: 'post',
    url: 'api/mobile/gene/subscribe',
  },

  isSubscribe: {
    method: 'post',
    url: 'api/mobile/gene/isSubscribe',
  },

  getUserInfo: {
    method: 'post',
    url: 'api/mobile/user/getUserInfo',
  },

  messageList: {
    method: 'post',
    url: 'api/mobile/user/messageList',
  },
  
  getOpenRegion: {
    method: 'post',
    url: 'api/home/api/getOpenRegion',
  },

  messageInfo: {
    method: 'post',
    url: 'api/mobile/user/messageInfo',
  },

  saveBase64Img: {
    method: 'post',
    url: 'api/mobile/file/saveBase64Img',
  },

  progressInfo: {
    method: 'post',
    url: 'api/mobile/report/progressInfo',
  },

  professional: {
    method: 'post',
    url: 'api/mobile/report/professional',
  },

  imageText: {
    method: 'post',
    url: '/api/mobile/report/imageText',
  },

  goodsItem: {
    method: 'post',
    url: 'api/mobile/goods/goodsItem',
  },

  goodsProgressList: {
    method: 'post',
    url: 'api/mobile/user/goodsProgressList',
  },

  bindUserList: {
    method: 'post',
    url: 'api/mobile/user/bindUserList',
  },

  binding: {
    method: 'post',
    url: 'api/mobile/gene/bind',
  },

  bindList: {
    method: 'post',
    url: 'api/mobile/user/bindList',
  },

  orderInfo: {
    method: 'post',
    url: 'api/mobile/user/orderInfo',
  },

  getSignPackage: {
    method: 'post',
    url: 'api/mobile/weixin/getSignPackage',
  },

  orderList: {
    method: 'post',
    url: 'api/mobile/user/orderList',
  },

  cancelOrder: {
    method: 'post',
    url: 'api/mobile/order/cancelOrder',
  },

  getPayParamer: {
    method: 'post',
    url: 'api/mobile/payment/getPayParam',
  },

  unbindList: {
    method: 'post',
    url: 'api/mobile/gene/unbindList',
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
