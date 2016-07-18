import React from 'react';
import ReactDOM from 'react-dom';
import jQuery from 'jquery';

import {Router, Route, hashHistory, Redirect} from 'react-router';

import Layout from './layout/Layout';

const app = (
  <Router history={hashHistory}>
    <Redirect from='/' to='/picture/1'>
    <Route path='/' component={Layout}>
      <Route path='picture' component={Pictures}>
        <Route path='/:id' component={Picture}></Route>
      </Route>
      <Route path='about' component={About}></Route>
    </Route>
  </Router>
);


jQuery(function(){
  ReactDOM.render(
    <Layout />,
    document.getElementById('comment-box')
  );
});
