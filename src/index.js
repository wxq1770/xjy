import React from 'react';
import ReactDOM from 'react-dom';
import { hashHistory } from 'react-router';
// eslint-disable-next-line import/no-extraneous-dependencies
import { AppContainer } from 'react-hot-loader';
// import 'antd-mobile/dist/antd-mobile.css';
import App from './App';
import createRoutes from './routes';
import configureStore from './store';


const initialState = window.__INITIAL_STATE__ || {};
const store = configureStore(initialState, hashHistory);
const routes = createRoutes(store);
const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component store={store} routes={routes} />
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(App);
// 这行是初始化用户引导的标记数据
// window.Joyride.initJoyrideStorage();

if (module.hot) { // eslint-disable-line no-undef
  module.hot.accept('./App', () => { // eslint-disable-line no-undef
    render(App);
  });
}
