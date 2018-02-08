import {
  ORDER_LIST,
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
