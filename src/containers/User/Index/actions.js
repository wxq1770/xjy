import {
  GET_USER_INFO,
} from './constants';

export function getUserInfo(params) {
  return ({ fetch }) => ({
    type: GET_USER_INFO,
    payload: {
      promise: fetch().getUserInfo(params)
        .then(res => res.body)
        .catch(err => {
          throw err;
        }),
    },
  });
}
