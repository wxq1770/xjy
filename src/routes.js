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
import Guide from './containers/Guide';
import ReportList from './containers/Report/List';
import ReportIndex from './containers/Report/Index';
import ReportInit from './containers/Report/Init';
import ReportDemo from './containers/Report/Demo';
import ReportProgress from './containers/Report/Progress';
import ReportDetail from './containers/Report/Detail';
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
        if(location.location.pathname !== '/login'){
          replace('/login?target='+location.location.pathname);
        }else{
          replace('/login');
        }
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
        //console.log('33333',location.search,location.query.target);
        if(location.location.search !== '' && location.location.query.target){
          replace(location.location.query.target);
        }else{
          replace('/index');
        }
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
        <Route path="guide" component={Guide} />
        <Route path="register" component={Register} />
        <Route path="buy(/:historyId)(/:goods_id)" component={Buy} />
        <Route path="address" component={Address} />
        <Route path="report" >
          <Route path="index" component={ReportIndex} />
          <Route path="demo" component={ReportDemo} />
          <Route path="list" component={ReportInit} />
          <Route path="init" component={ReportList} />
          <Route path="detail(/:inspector_id)(/:goods_id)(/:bind_id)" component={ReportDetail} />
          <Route path="progress(/:inspector_id)(/:goods_id)(/:bind_id)" component={ReportProgress} onEnter={validate(getState, dispatch)} />
        </Route>
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
