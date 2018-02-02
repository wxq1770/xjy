import { fromJS } from 'immutable';
import {
  HELLO_WORLD_SUCCESS,
} from './constants';

const initialState = fromJS({
  helloword: {},
});

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case HELLO_WORLD_SUCCESS: {
      const response = action.payload;
      return state.set('helloword', fromJS(response || {}));
    }
  }
  return state;
}
