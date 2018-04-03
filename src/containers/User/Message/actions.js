import {
  MESSAGE_LIST,
} from './constants';

export function messageList(params) {
  return ({ fetch }) => ({
    type: MESSAGE_LIST,
    payload: {
      promise: fetch().messageList(params)
        .then(res => res.body)
        .catch(err => {
          throw err;
        }),
    },
  });
}
