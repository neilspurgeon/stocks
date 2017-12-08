import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Portfolio from 'containers/portfolio/Portfolio.js';
import Search from 'containers/search/Search.js';

const Routes = () => (
  <Switch>
    <Route exact path='/' component={Portfolio} />
    <Route exact path='/portfolio' component={Portfolio} />
    <Route exact path='/search' component={Search} />
  </Switch>
);


export default Routes;
