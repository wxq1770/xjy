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

export function sendLoginCode(params) {
  return ({ fetch }) => ({
    type: SEND_LOGIN_CODE,
    payload: {
      promise: fetch().sendLoginCode(params)
        .then(res => res.body)
        .catch(err => {
          throw err;
        }),
    },
  });
}

export function loginForm(params) {
  return ({ fetch }) => ({
    type: LOGIN,
    payload: {
      promise: fetch().loginForm(params)
        .then(res => res.body)
        .catch(err => {
          throw err;
        }),
    },
  });
}

export function userStore(params) {
  return ({ fetch }) => ({
    type: 'userStore',
    payload: state => {
      return params;
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
