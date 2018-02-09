import React from 'react';
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

import {
  isLogin,
} from './containers/App/actions';

const validate = (getState, dispatch) => {
  return async (location, replace, callback) => {
    try {
      const { value: { status, data }} = await dispatch(isLogin({
        body: {},
      }));
      if (data.is_login !== 1) {
        replace('/login');
      }
      callback();
    } catch (error) {
      throw error;
    }
  };
};

const loginState = (getState, dispatch) => {
  return async (location, replace, callback) => {
    try {
      const { value: { status, data }} = await dispatch(isLogin({
        body: {},
      }));
      if (data.is_login === 1) {
        replace('/index');
      }
      callback();
    } catch (error) {
      throw error;
    }
  };
};

const redirect = () => {
  return (nextState, replace) => {
    replace('/index');
  };
};

export default function createRoutes({ getState, dispatch }) {
  return (
    <Router>
      <Route
        path="/"
        component={App}>
        <IndexRoute onEnter={redirect(getState, dispatch)} />
        <Route path="login" component={Login} onEnter={loginState(getState, dispatch)}/>
        <Route path="index" component={Index} />
        <Route path="details" component={Details} />
        <Route path="register" component={Register} />
        <Route path="buy(/:historyId)" component={Buy} />
        <Route path="address" component={Address} />
        <Route path="result/:page/:status" component={Result} onEnter={validate(getState, dispatch)} />
        <Route path="binding" component={Binding} onEnter={validate(getState, dispatch)} />
        <Route path="bindingrecord" component={BindingRecord} onEnter={validate(getState, dispatch)} />
        <Route path="user" onEnter={validate(getState, dispatch)}>
          <Route path="order" component={UserOrder} />
          <Route path="order/details/:id" component={Order} />
        </Route>
      </Route>
    </Router>
  );
}
