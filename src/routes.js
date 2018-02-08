import React from 'react';
// import moment from 'moment';
import lodashIsEmpty from 'lodash.isempty';
import { Router, Route, IndexRoute } from 'react-router';

import App from './containers/App';
import Login from './containers/Login';
import Register from './containers/Register';
import Buy from './containers/Buy';
import Result from './containers/Result';
import Address from './containers/Address';

import Binding from './containers/Binding';
import Index from './containers/Index';
import Details from './containers/Details';
import BindingRecord from './containers/BindingRecord';
import UserOrder from './containers/User/Order';
import Order from './containers/User/OrderDetails';


const validate = (getState, dispatch) => {
  return async (location, replace, callback) => {
    const { auth: { user }} = getState().toJS();
    const { location: { pathname }} = location;
    if (!lodashIsEmpty(user)) {
      replace('/register');
    } else if (!user.id) {
      replace('/login');
    }
    callback();
  };
};

const redirect = getState => {
  return (nextState, replace) => {
    //这里根据业务跳转不同的页面
    //const { auth: { user }} = getState().toJS();
    replace('/index');
  };
};

const shouldToLogin = (getState, dispatch) => {
  return async (location, replace, callback) => {
    //这些代码都还可以用
    const { auth: { user }} = getState().toJS();
    if (user && user.id) {
      replace('/');
    } else {
      const { value: { error, data: currentUser }} = await dispatch(fetchCurrentUser);
      if (currentUser && currentUser.id) {
        replace('/');
      } else if (!error && !currentUser) {
        replace('/login');
      }
    }
    callback();
  };
};

export default function createRoutes({ getState, dispatch }) {
  return (
    <Router>
      <Route
        path="/"
        component={App}>
        <IndexRoute onEnter={redirect(getState, dispatch)} />
        <Route path="login" component={Login} />
        <Route path="index" component={Index} />
        <Route path="details" component={Details} />
        <Route path="register" component={Register} />
        <Route path="buy(/:historyId)" component={Buy} />
        <Route path="address" component={Address} />
        <Route path="result/:page/:status" component={Result} />
        <Route path="binding" component={Binding} />
        <Route path="bindingrecord" component={BindingRecord} />
        <Route path="user" onEnter={validate(getState, dispatch)}>
          <Route path="order" component={UserOrder} />
          <Route path="order/details/:id" component={Order} />
        </Route>
      </Route>
    </Router>
  );
}
