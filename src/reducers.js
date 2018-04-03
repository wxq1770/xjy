import { combineReducers } from 'redux-immutable';

/**
 * import modules reducers
 */
import loginReducer from './containers/Login/reducer';
import registerReducer from './containers/Register/reducer';
import buyReducer from './containers/Buy/reducer';
import indexReducer from './containers/Index/reducer';
import addressReducer from './containers/Address/reducer';
import resultReducer from './containers/Result/reducer';


const reducers = combineReducers({
  user: loginReducer,
  register: registerReducer,
  buyReducer,
  indexReducer,
  addressReducer,
  resultReducer,
});

export default reducers;
