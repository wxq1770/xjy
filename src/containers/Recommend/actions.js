import {
  HELLO_WORLD,
} from './constants';

export function helloword(params) {
  return ({ fetch }) => ({
    type: HELLO_WORLD,
    payload: {
      promise: fetch().helloword({ params })
        .then(res => res.body)
        .catch(err => {
          throw err;
        }),
    },
  });
}
