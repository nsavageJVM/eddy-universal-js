import React from 'react'
import Ticket from './Ticket'
import { Link, IndexLink } from 'react-router'

const allTicketsUrl = '/api/ticket'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tickets: props.tickets || []
    }
  }

  componentDidMount() {
    const request = new XMLHttpRequest()
    request.open('GET', allTicketsUrl, true)
    request.setRequestHeader('Content-type', 'application/json')

    request.onload = () => {
      if (request.status === 200) {
        this.setState({
          tickets: JSON.parse(request.response)
        });
      }
    }

    request.send()
  }

  render() {
    const tickets = this.state.tickets.map((ticket) => {
      const linkTo = `/${ticket.id}/${ticket.title}`;

      return (
        <li key={ticket.id}>
          <Link to={linkTo}>{ticket.title}</Link>
        </li>
      )
    })

    const { ticketId, ticketName } = this.props.params;
    let ticketTitle, ticketContent
    if (ticketId && ticketName) {
      const ticket = this.state.tickets.find(p => p.id == ticketId)
      ticketTitle = ticket.title
      ticketContent = ticket.content
    }

    return (
      <div>
        <IndexLink to="/">Home</IndexLink>
        <h3>Tickets</h3>
        <ul>
          {tickets}
        </ul>

        {ticketTitle && ticketContent ? (
          <Ticket title={ticketTitle} content={ticketContent} />
        ) : (
          this.props.children
        )}
      </div>
    )
  }
}

export default App
