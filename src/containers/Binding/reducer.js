import { fromJS } from 'immutable';
import {
  BINDING,
} from './constants';

const initialState = fromJS({
  // helloword: {},
});

export default function appReducer(state = initialState, action) {
  // switch (action.type) {
  //   case BINDING: {
  //     const response = action.payload;
  //     return state.set('helloword', fromJS(response || {}));
  //   }
  // }
  return state;
}
