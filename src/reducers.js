import { combineReducers } from 'redux-immutable';

/**
 * import modules reducers
 */
import appReducer from './containers/App/reducer';
import loginReducer from './containers/Login/reducer';
import registerReducer from './containers/Register/reducer';
import buyReducer from './containers/Buy/reducer';
import addressReducer from './containers/Address/reducer';
import resultReducer from './containers/Result/reducer';


const reducers = combineReducers({
  app: appReducer,
  login: loginReducer,
  register: registerReducer,
  buyReducer: buyReducer,
  addressReducer : addressReducer,
  resultReducer : resultReducer,
});

export default reducers;
