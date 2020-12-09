import React, { Component } from 'react'
import Chat from '../Chat'
import ChatMessage from './ChatMessage'
import ChatBlocker from './ChatBlocker'

export class Chatlist extends Component {
  constructor(props){
    super(props)
    this.state = {
      isAuthenticated: true
    }
  }
  render() {
    const { isAuthenticated } = this.state;
    const activeChat  = {
      overflowY: 'auto'
    }
    const inactiveChat  = {
      overflowY: 'hidden'
    }
    return (
        <div className="ChatList" style={ isAuthenticated ? activeChat : inactiveChat }>
            { isAuthenticated ? '' : <ChatBlocker />}
            <ul className="Chat">
                <ChatMessage />
                <ChatMessage />
                <ChatMessage />
                <ChatMessage />
                <ChatMessage />
                <ChatMessage />
                <ChatMessage />
            </ul>
        </div>
    )
  }
}

export default Chatlist
