import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import createLogger from 'redux-logger';
import { fromJS } from 'immutable';
import reducers from './reducers';
import fetch from './libs/fetch';
import config from './config';

export default function configureStore(initialState = {}) {
  /**
   * redux middlewares
   * @type {[type]}
   */
  const dependenciesMiddleware = injectDependencies({ fetch });
  const middlewares = [
    dependenciesMiddleware,
    promiseMiddleware({
      promiseTypeSuffixes: ['START', 'SUCCESS', 'ERROR'],
    }),
  ];

  /**
   * redux action logger
   * @type {[type]}
   */
  const enableLogger = config.debug;
  if (enableLogger) {
    const logger = createLogger({
      collapsed: true,
      stateTransformer: state => JSON.parse(JSON.stringify(state)),
    });
    middlewares.push(logger);
  }

  const enhancers = [
    applyMiddleware(...middlewares),
  ];

  const composeEnhancers =
    process.env.NODE_ENV !== 'production' && // eslint-disable-line no-undef
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

  const store = createStore(reducers, fromJS(initialState), composeEnhancers(...enhancers));

  if (module.hot) { // eslint-disable-line no-undef
    module.hot.accept('./reducers', () => { // eslint-disable-line no-undef
      const nextReducers = require('./reducers').default; // eslint-disable-line no-undef
      store.replaceReducer(nextReducers);
    });
  }

  return store;
}


function injectDependencies(statics, dynamic = {}) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action !== 'function') return next(action);
    const dependencies = { ...statics };
    Object.keys(dynamic).forEach(key => {
      dependencies[key] = dynamic[key](getState());
    });
    return dispatch(action({ ...dependencies, getState, dispatch }));
  };
}
