import {
  PROGRESS_INFO,
} from './constants';

export function progressInfo(params) {
  return ({ fetch }) => ({
    type: PROGRESS_INFO,
    payload: {
      promise: fetch().progressInfo(params)
        .then(res => res.body)
        .catch(err => {
          throw err;
        }),
    },
  });
}
