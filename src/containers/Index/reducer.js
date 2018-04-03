import { fromJS } from 'immutable';

const initialState = fromJS({
  focusStatus: false,
});

export default function indexReducer(state = initialState, action) {
  switch (action.type) {
    case 'focusStatus': {
      const response = action.payload;
      return state.set('focusStatus', fromJS(response || {}));
    }
  }
  return state;
}
