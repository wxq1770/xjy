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
import Recommend from './containers/Recommend';
import ReportList from './containers/Report/List';
import ReportIndex from './containers/Report/Index';
import ReportInit from './containers/Report/Init';
import ReportDemo from './containers/Report/Demo';
import ReportProgress from './containers/Report/Progress';
import ReportDetail from './containers/Report/Detail';
import BindingRecord from './containers/BindingRecord';
import UserOrder from './containers/User/Order';
import UserIndex from './containers/User/Index';
import SetAccount from './containers/User/SetAccount';
import Message from './containers/User/Message';
import MessageDetail from './containers/User/MessageDetail';
import Help from './containers/User/Help';
import ContactUs from './containers/ContactUs';
import FirstSale from './containers/Event/FirstSale';


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
      if (status !== 1 || data.is_login !== 1) {
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
      if (status === 1 && data.is_login === 1) {
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
        <Route path="login" component={Login} onEnter={loginState(getState, dispatch)} />
        <Route path="index" component={Index}  />
        <Route path="guide" component={Guide} />
        <Route path="details" component={Recommend} />
        <Route path="register" component={Register} onEnter={loginState(getState, dispatch)} />
        <Route path="contactus" component={ContactUs} />
        <Route path="buy(/:historyId)(/:goods_id)" component={Buy} />
        <Route path="buyproduct(/:historyId)(/:goods_id)" component={Buy} />
        <Route path="address" component={Address} />
        <Route path="event/sale" component={FirstSale} />
        <Route path="report" >
          <Route path="index" component={ReportIndex} />
          <Route path="demo" component={ReportDemo} />
          <Route path="list" component={ReportInit} />
          <Route path="init" component={ReportList} />
          <Route path="detail(/:bind_id)(/:goods_id)(/:inspector_id)" component={ReportDetail} />
          <Route path="progress(/:bind_id)(/:goods_id)(/:inspector_id)(/:userTitle)" component={ReportProgress} onEnter={validate(getState, dispatch)} />
        </Route>
        <Route path="result/:page/:status(/:id)" component={Result} onEnter={validate(getState, dispatch)} />
        <Route path="binding" component={Binding} onEnter={validate(getState, dispatch)} />
        <Route path="bindingrecord" component={BindingRecord} onEnter={validate(getState, dispatch)} />
        <Route path="user" >
          <Route path="index" component={UserIndex} />
          <Route path="help" component={Help} />
          <Route path="message" component={Message} onEnter={validate(getState, dispatch)}/>
          <Route path="messageDetail/:msg_id" component={MessageDetail} onEnter={validate(getState, dispatch)}/>
          <Route path="setaccount" component={SetAccount} onEnter={validate(getState, dispatch)}/>
          <Route path="order" component={UserOrder} onEnter={validate(getState, dispatch)}/>
          <Route path="order/details/:id" component={Order} onEnter={validate(getState, dispatch)}/>
        </Route>
      </Route>
    </Router>
  );
}
