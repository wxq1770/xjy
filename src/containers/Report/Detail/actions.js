import {
  GOODS_ITEM,
  PROFESSIONAL,
  IMAGE_TEXT,
  SAVE_BASE_64_IMG,
} from './constants';

export function goodsItem(params) {
  return ({ fetch }) => ({
    type: GOODS_ITEM,
    payload: {
      promise: fetch().goodsItem(params)
        .then(res => res.body)
        .catch(err => {
          throw err;
        }),
    },
  });
}

export function saveBase64Img(params) {
  return ({ fetch }) => ({
    type: SAVE_BASE_64_IMG,
    payload: {
      promise: fetch().saveBase64Img(params)
        .then(res => res.body)
        .catch(err => {
          throw err;
        }),
    },
  });
}


export function professional(params) {
  return ({ fetch }) => ({
    type: GOODS_ITEM,
    payload: {
      promise: fetch().professional(params)
        .then(res => res.body)
        .catch(err => {
          throw err;
        }),
    },
  });
}


export function imageText(params) {
  return ({ fetch }) => ({
    type: GOODS_ITEM,
    payload: {
      promise: fetch().imageText(params)
        .then(res => res.body)
        .catch(err => {
          throw err;
        }),
    },
  });
}
