import {
  BINDING,
  UNBIND_LIST,
  GET_SIGN_PACKAGE
} from './constants';

export function binding(params) {
  return ({ fetch }) => ({
    type: BINDING,
    payload: {
      promise: fetch().binding(params)
        .then(res => res.body)
        .catch(err => {
          throw err;
        }),
    },
  });
}

export function unbindList(params) {
  return ({ fetch }) => ({
    type: UNBIND_LIST,
    payload: {
      promise: fetch().unbindList(params)
        .then(res => res.body)
        .catch(err => {
          throw err;
        }),
    },
  });
}

export function getSignPackage(params) {
  return ({ fetch }) => ({
    type: GET_SIGN_PACKAGE,
    payload: {
      promise: fetch().getSignPackage(params)
        .then(res => res.body)
        .catch(err => {
          throw err;
        }),
    },
  });
}

