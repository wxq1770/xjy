import { fromJS } from 'immutable';

const initialState = fromJS({
    state: false,
});

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case 'userStore': {
      const response = action.payload;
      return state.set('state', fromJS(response() || {}));
    }
  }
  return state;
}
