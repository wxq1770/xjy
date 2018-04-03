import {
  SUBSCRIBE,
  IS_SUBSCRIBE,
} from './constants';

export function focusStatus(params) {
  return () => ({
    type: 'focusStatus',
    payload: () => {
      return params;
    },
  });
}

export function subscribe(params) {
  return ({ fetch }) => ({
    type: SUBSCRIBE,
    payload: {
      promise: fetch().subscribe(params)
        .then(res => res.body)
        .catch(err => {
          throw err;
        }),
    },
  });
}

export function isSubscribe(params) {
  return ({ fetch }) => ({
    type: IS_SUBSCRIBE,
    payload: {
      promise: fetch().isSubscribe(params)
        .then(res => res.body)
        .catch(err => {
          throw err;
        }),
    },
  });
}

