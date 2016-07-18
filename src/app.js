import React from 'react';
import ReactDOM from 'react-dom';
import jQuery from 'jquery';

import {Router, Route, hashHistory, Redirect} from 'react-router';

import Layout from './layout/Layout';
import PictureBox from './components/PictureBox';
//import Picture from './components/Picture';
import About from './components/About';


const app = (
  <Router history={hashHistory}>
    <Redirect from='/' to='/about' />
    <Route path='/' component={Layout}>
      <Route path='pictures' component={PictureBox}></Route>
      <Route path='about' component={About}></Route>
    </Route>
  </Router>
);


jQuery(function(){
  ReactDOM.render(
    app,
    document.getElementById('app-box')
  );
});
