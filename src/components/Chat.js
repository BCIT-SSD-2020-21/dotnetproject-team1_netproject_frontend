import React, { Component } from 'react'
import Chatlist from './Chat/Chatlist'
import SubmitMessage from './Chat/SubmitMessage'

export class Chat extends Component {

    constructor(props){
        super(props)
        this.state = { rerender : false }
    }

    didPost = ()=>{
        console.log('this was posted')
        this.setState({rerender : !this.state.rerender})
    }
    render() {
        const { rerender } = this.state
        return (
            <div>
                <Chatlist rerender = {rerender}/>
                <SubmitMessage didPost = {this.didPost}/>
            </div>
        )
    }
}

export default Chat
