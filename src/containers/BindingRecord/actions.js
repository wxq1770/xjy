import {
  BIND_LIST,
} from './constants';

export function bindList(params) {
  return ({ fetch }) => ({
    type: BIND_LIST,
    payload: {
      promise: fetch().bindList({ params })
        .then(res => res.body)
        .catch(err => {
          throw err;
        }),
    },
  });
}
