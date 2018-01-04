import { combineReducers } from 'redux-immutable';

/**
 * import modules reducers
 */
import appReducer from './containers/App/reducer';
import loginReducer from './containers/Login/reducer';
import registerReducer from './containers/Register/reducer';
import buyReducer from './containers/Buy/reducer';

const reducers = combineReducers({
  app: appReducer,
  login: loginReducer,
  register: registerReducer,
  buy: buyReducer
});

export default reducers;
