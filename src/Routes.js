import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Portfolio from 'containers/portfolio/Portfolio.js';

const Routes = () => (
  <Switch>
    <Route exact path='/' component={Portfolio} />
    <Route exact path='/portfolio' component={Portfolio} />
    <Route exact path='/search' component={Portfolio} />
  </Switch>
)


export default Routes;
