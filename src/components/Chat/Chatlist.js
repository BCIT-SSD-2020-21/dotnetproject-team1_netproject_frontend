import React, { Component } from 'react'
import Chat from '../Chat'
import ChatMessage from './ChatMessage'

export class Chatlist extends Component {
    render() {
        return (
            <div className="ChatList">
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
