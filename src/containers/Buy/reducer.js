import { fromJS } from 'immutable';
import {
  HISTORY_PERSON_SUCCESS,
} from './constants';

const initialState = fromJS({
    buyReducer : [],
    total : 0,
});

export default function buyReducer(state = initialState, action) {
  switch (action.type) {
    case 'buyReducer': {
      const response = action.payload;
      return state.set('buyReducer', fromJS(response() || {}));
    }
    case 'total': {
      const response = action.payload;
      return state.set('total', fromJS(response() || {}));
    }
  }
  return state;
}
