import { fromJS } from 'immutable';
import {
  MOBILE_EXIST_SUCCESS,
  SEND_LOGIN_CODE_SUCCESS,
  LOGIN_SUCCESS,
  CHECK_VERIFY_CODE_SUCCESS
} from './constants';

const initialState = fromJS({

});

export default function appReducer(state = initialState, action) {
  // switch (action.type) {
  // }
  return state;
}
