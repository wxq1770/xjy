import { fromJS } from 'immutable';
const initialState = fromJS({
  auth: {
    user: false,
  },
});

export default function appReducer(state = initialState, action) {
  // switch (action.type) {
  //   case HELLO_WORLD_SUCCESS: {
  //     const response = action.payload;
  //     return state.set('helloword', fromJS(response || {}));
  //   }
  // }
  return state;
}
