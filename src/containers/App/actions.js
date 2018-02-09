import {
  IS_LOGIN,
} from './constants';

export function isLogin(params) {
  return ({ fetch }) => ({
    type: IS_LOGIN,
    payload: {
      promise: fetch().isLogin({ params })
        .then(res => res.body)
        .catch(err => {
          throw err;
        }),
    },
  });
}
