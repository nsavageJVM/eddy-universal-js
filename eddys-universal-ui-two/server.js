const express = require('express')
const path = require('path');
const tickets = require('./tickets');

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

const PORT = process.env.PORT || 3000
app.listen(PORT, function() {
  console.log('Express running at localhost: ' + PORT)
})
