import {
  BINDING,
  UNBIND_LIST,
  GET_SIGN_PACKAGE,
  SELF_BINDED,
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

export function selfBinded(params) {
  return ({ fetch }) => ({
    type: SELF_BINDED,
    payload: {
      promise: fetch().selfBinded(params)
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

