import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './App'
import Home from './Home'
import Post from './Ticket'

module.exports = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/:ticketId/:ticketName" />
  </Route>
)
