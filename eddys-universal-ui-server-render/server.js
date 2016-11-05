const express = require('express')
const path = require('path')
const tickets = require('./tickets')

import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import routes from './components/routes'

const app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.get('/api/ticket/:id?', (req, res) => {
  const id = req.params.id
  if (!id) {
    res.json(tickets)
  } else {
    const ticket = tickets.find(p => p.id == id);
    if (ticket)
      res.json(ticket)
    else
      res.status(404).send('Not Found')
  }
})

app.get('*', (req, res) => {
  match({ routes: routes, location: req.url }, (err, redirect, serverRenderedData) => {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirect) {
      res.redirect(redirect.pathname + redirect.search)
    } else if (serverRenderedData) {
      const routerContextWithData = (
        <RouterContext 
          {...serverRenderedData}
          createElement={(Component, serverRenderedData) => {
            return <Component tickets={tickets} {...serverRenderedData} />
          }}
        />
      )
      const serverContent = renderToString(routerContextWithData)
      res.send(serverContentRender(serverContent))
    } else {
      res.status(404).send('Not Found')
    }
  })
})

function serverContentRender(serverContent) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>eddy's ticketing app</title>
  </head>
  <body>
    <div id="app">${serverContent}</div> 
    <script src="/bundle.js"></script>
  </body>
  </html>
  `
}

const PORT = process.env.PORT || 3000
app.listen(PORT, function() {
  console.log('Express running at localhost:' + PORT)
})
