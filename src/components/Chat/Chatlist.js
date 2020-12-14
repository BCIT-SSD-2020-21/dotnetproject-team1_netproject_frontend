import React, { Component } from 'react'
import ChatMessage from './ChatMessage'
import ChatBlocker from './ChatBlocker'



const BASE_URL = "https://parlezwebapi.azurewebsites.net/api/";

export class Chatlist extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAuthenticated: true, 
      messages: []
    }
  }

  componentDidMount = () => {
    this.fetchMessages()
    this.scrollToBottom()

  }
  componentDidUpdate = (prevProps) => {
    if (prevProps.rerender !== this.props.rerender) {
      this.fetchMessages();
    }
  }

  fetchMessages = () => {
    fetch(`${BASE_URL}Chat`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('bearer-token')}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        const mappedData = data.map((d) => {
          return {
            ...d, 
            createdOn: this.parseDate(d.createdOn)
          }
        })
        this.setState({ messages: mappedData }, () => {this.scrollToBottom()})
      })
      .catch((err) => { });
  };

  parseDate = (date) => {
    // Parse data into a date string
    const parsedDate = Date.parse(date)
    // if can't parse, return the original string
    if (!parsedDate) return date
    // Make parsedDate into a new Date object
    const d = new Date(parsedDate)
    // config date options
    const dateOptions = {year: 'numeric', month: 'long', day: '2-digit'}
    const timeOptions = { hour: 'numeric', minute: 'numeric'}
    // Set current date and time
    const currDate = new Intl.DateTimeFormat('en', dateOptions).format(d)
    const time = new Intl.DateTimeFormat('en', timeOptions).format(d)
    // Return formatted date string
    const dateString = `${currDate} at ${time}`
    return dateString
  }

  scrollToBottom = () => {
    const ChatList = document.querySelector('.ChatList')
    const Chat = document.querySelector('.Chat')
    setTimeout(() => {
      ChatList.scrollTop = Chat.scrollHeight;
    }, 500)
  }

  render() {
    const { isAuthenticated } = this.state;
    const activeChat = {
      overflowY: 'auto'
    }
    const inactiveChat = {
      overflowY: 'hidden'
    }
    return (
      <div className="ChatList" style={isAuthenticated ? activeChat : inactiveChat}>
        { isAuthenticated ? '' : <ChatBlocker />}
        <ul className="Chat">
          {this.state.messages.map((message, index) => {
            return (
              <ChatMessage message={message} key={index} fetchMessages={this.fetchMessages} />
            )
          })}
        </ul>
      </div>
    )
  }
}

export default Chatlist
