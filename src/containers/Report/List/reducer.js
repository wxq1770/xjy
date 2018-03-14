import { fromJS } from 'immutable';
import {
  MOBILE_EXIST_SUCCESS,
} from './constants';

const initialState = fromJS({
    title : '',
    content : '',
    btn : ''
});

export default function resultReducer(state = initialState, action) {
  // switch (action.type) {
  // }
  return state;
}
