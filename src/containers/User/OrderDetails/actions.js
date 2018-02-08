import {
  ORDER_INFO,
  CANCEL_ORDER,
} from './constants';

export function orderInfo(params) {
  return ({ fetch }) => ({
    type: ORDER_INFO,
    payload: {
      promise: fetch().orderInfo(params)
        .then(res => res.body)
        .catch(err => {
          throw err;
        }),
    },
  });
}

export function cancelOrder(params) {
  return ({ fetch }) => ({
    type: CANCEL_ORDER,
    payload: {
      promise: fetch().cancelOrder(params)
        .then(res => res.body)
        .catch(err => {
          throw err;
        }),
    },
  });
}
