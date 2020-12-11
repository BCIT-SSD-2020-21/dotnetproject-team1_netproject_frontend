import React, { Component } from 'react'
import Chat from '../Chat'
import ChatMessage from './ChatMessage'
import ChatBlocker from './ChatBlocker'
import { UpTriangle, DownTriangle } from '../Icons'


const BASE_URL = "https://localhost:44363/api/";

export class Chatlist extends Component {
  constructor(props){
    super(props)
    this.state = {
      isAuthenticated: true, 
      messages: []
    }
  }

componentDidMount = () => {
  this.fetchMessages()

}
componentDidUpdate = (prevProps) => {
  if(prevProps.rerender !== this.props.rerender){
    this.fetchMessages();
  }
}

  fetchMessages = () => {
    fetch(`${BASE_URL}Chat`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        this.setState({messages:data})
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
            { isAuthenticated ? '' : <ChatBlocker/>}
            <ul className="Chat">
              { this.state.messages.map((message, index)=>{
                return( 
                  <ChatMessage message={message} key={index}/>
                )
              })}
            </ul>
        </div>
    )
  }
}

export default Chatlist
