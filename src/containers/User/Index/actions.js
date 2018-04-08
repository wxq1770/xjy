import {
  GET_USER_INFO,
  MESSAGE_COUNT,
} from './constants';

export function getUserInfo(params) {
  return ({ fetch }) => ({
    type: GET_USER_INFO,
    payload: {
      promise: fetch().getUserInfo(params)
        .then(res => res.body)
        .catch(err => {
          throw err;
        }),
    },
  });
}

export function messageUnreadCount(params) {
  return ({ fetch }) => ({
    type: MESSAGE_COUNT,
    payload: {
      promise: fetch().messageUnreadCount(params)
        .then(res => res.body)
        .catch(err => {
          throw err;
        }),
    },
  });
}
