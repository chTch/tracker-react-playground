import React from 'react'
import { Route, Switch } from 'react-router'

//import Services from '../components/Services' <Services />    
import Home from './home'

export default () => (
  <div>    
    <Switch>
      <Route component={Home} path='/' />
    </Switch>
  </div>
)