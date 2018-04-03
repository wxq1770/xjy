import {
  MESSAGE_INFO,
} from './constants';

export function messageInfo(params) {
  return ({ fetch }) => ({
    type: MESSAGE_INFO,
    payload: {
      promise: fetch().messageInfo(params)
        .then(res => res.body)
        .catch(err => {
          throw err;
        }),
    },
  });
}
