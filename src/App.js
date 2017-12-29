import React from 'react';
import { Provider } from 'react-redux';
import { Router, hashHistory, applyRouterMiddleware } from 'react-router';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import './util/polyfill';
import './util/DOMUtils';

// 这里添加 ga 啊百度统计的代码
// hashHistory.listen(location => {
//   if (typeof window.ga === 'function') {
//     window.ga('set', 'page', location.pathname);
//     window.ga('send', 'pageview');
//   }
// });

const App = ({ store, routes }) =>
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <Router
        routes={routes}
        history={hashHistory}
        render={applyRouterMiddleware()} />
    </Provider>
  </I18nextProvider>;

export default App;
