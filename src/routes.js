import React from 'react';
// import moment from 'moment';
// import lodashIsEmpty from 'lodash.isempty';
import { Router, Route, IndexRoute } from 'react-router';

import App from './containers/App';
import Login from './containers/Login';
import Register from './containers/Register';
import Buy from './containers/Buy';
import Address from './containers/Address';

const validate = (getState, dispatch) => {
  return async (location, replace, callback) => {
    // const { auth: { user }} = getState().toJS();
    // const { location: { pathname }} = location;
    // if (!lodashIsEmpty(user)) {
      // 去注册
    // } else if (!user.id) {
      // 去登录
    // }
    callback();
  };
};

const redirect = getState => {
  return (nextState, replace) => {
    // 这里根据业务跳转不同的页面
    // const { auth: { user }} = getState().toJS();
    // replace('/');
  };
};

const shouldToLogin = (getState, dispatch) => {
  return async (location, replace, callback) => {
    // 这些代码都还可以用
    // const { auth: { user }} = getState().toJS();
    // if (user && user.id) {
    //   replace('/');
    // } else {
    //   const { value: { error, data: currentUser }} = await dispatch(fetchCurrentUser);
    //   if (currentUser && currentUser.id) {
    //     replace('/');
    //   } else if (!error && !currentUser) {
    //     replace('/login');
    //   }
    // }
    callback();
  };
};

export default function createRoutes({ getState, dispatch }) {
  return (
    <Router>
      <Route
        path="/"
        component={App}
        onEnter={validate(getState, dispatch)}>
        <IndexRoute onEnter={redirect(getState, dispatch)} />
      </Route>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/buy" component={Buy} />
      <Route path="/address" component={Address} />
    </Router>
  );
}
