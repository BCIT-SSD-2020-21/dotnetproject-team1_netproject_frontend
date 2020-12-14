import React, { Component } from 'react'
import ChatMessage from './ChatMessage'
import ChatBlocker from './ChatBlocker'



const BASE_URL = "https://localhost:44363/api/";

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
        this.setState({ messages: data }, () => {this.scrollToBottom()})
      })
      .catch((err) => { });
  };

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
