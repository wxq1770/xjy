import {
  ORDER_LIST,
  PAY_PARAMER
} from './constants';

export function orderList(params) {
  return ({ fetch }) => ({
    type: ORDER_LIST,
    payload: {
      promise: fetch().orderList(params)
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
