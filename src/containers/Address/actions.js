import {
  ADD_ORDER,
  PAY_PARAMER,
} from './constants';

export function addOrder(params) {
  return ({ fetch }) => ({
    type: ADD_ORDER,
    payload: {
      promise: fetch().addOrder(params)
        .then(res => res.body)
        .catch(err => {
          throw err;
        }),
    },
  });
}

export function getPayParamer(params) {
  return ({ fetch }) => ({
    type: PAY_PARAMER,
    payload: {
      promise: fetch().getPayParamer(params)
        .then(res => res.body)
        .catch(err => {
          throw err;
        }),
    },
  });
}

export function addressReducer(type, value) {
  return () => ({
    type: 'addressReducer',
    payload: () => {
      return {
        type,
        value,
      };
    },
  });
}

export function clearStore() {
  return () => ({
    type: 'clearStore',
    payload: () => {
      return {};
    },
  });
}

