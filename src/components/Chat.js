import React, { Component } from 'react'
import Chatlist from './Chat/Chatlist'
import SubmitMessage from './Chat/SubmitMessage'

export class Chat extends Component {
    render() {
        return (
            <div>
                <Chatlist />
                <SubmitMessage />
            </div>
        )
    }
}

export default Chat
