import {
  GOODS_PROGRESS_LIST,
  BIND_USER_LIST,
} from './constants';

export function goodsProgressList(params) {
  return ({ fetch }) => ({
    type: GOODS_PROGRESS_LIST,
    payload: {
      promise: fetch().goodsProgressList(params)
        .then(res => res.body)
        .catch(err => {
          throw err;
        }),
    },
  });
}

export function bindUserList(params) {
  return ({ fetch }) => ({
    type: BIND_USER_LIST,
    payload: {
      promise: fetch().bindUserList(params)
        .then(res => res.body)
        .catch(err => {
          throw err;
        }),
    },
  });
}