import {
  MOBILE_EXIST,
  SEND_LOGIN_CODE,
  LOGIN,
  CHECK_VERIFY_CODE,
} from './constants';

export function mobileExist(params) {
  return ({ fetch }) => ({
    type: MOBILE_EXIST,
    payload: {
      promise: fetch().mobileExist(params)
        .then(res => res.body)
        .catch(err => {
          throw err;
        }),
    },
  });
}

export function sendRegCode(params) {
  return ({ fetch }) => ({
    type: SEND_LOGIN_CODE,
    payload: {
      promise: fetch().sendRegCode(params)
        .then(res => res.body)
        .catch(err => {
          throw err;
        }),
    },
  });
}

export function register(params) {
  return ({ fetch }) => ({
    type: LOGIN,
    payload: {
      promise: fetch().register(params)
        .then(res => res.body)
        .catch(err => {
          throw err;
        }),
    },
  });
}

export function checkVerifyCode(params) {
  return ({ fetch }) => ({
    type: CHECK_VERIFY_CODE,
    payload: {
      promise: fetch().checkVerifyCode(params)
        .then(res => res.body)
        .catch(err => {
          throw err;
        }),
    },
  });
}
