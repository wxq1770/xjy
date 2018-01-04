import {
  MOBILE_EXIST,
} from './constants';

export function mobileExist(params) {
  return ({ fetch }) => ({
    type: MOBILE_EXIST,
    payload: {
      promise: fetch().mobileExist(params)
        .then(res => res.body)
        .catch(err => {
          throw err;
        }),
    },
  });
}
