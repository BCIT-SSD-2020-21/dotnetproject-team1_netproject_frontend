import React, { Component } from 'react'
import ChatMessage from './ChatMessage'
import ChatBlocker from './ChatBlocker'


const messagesEndRef = React.createRef()
const BASE_URL = "https://parlezwebapi.azurewebsites.net/api/";
export class Chatlist extends Component {
  constructor(props){
    super(props)
    this.messagesEndRef = messagesEndRef
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
  if(prevProps.rerender !== this.props.rerender){
    this.fetchMessages();
    this.scrollToBottom()
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

  scrollToBottom = () => {
    const ChatList = document.querySelector('.ChatList')
    const Chat = document.querySelector('.ChatList')
    setTimeout(() => {
      ChatList.scrollTop = Chat.scrollHeight;
    }, 500)
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
            { isAuthenticated ? '' : <ChatBlocker/>}
            <ul className="Chat">
              { this.state.messages.map((message, index)=>{
                return( 
                  <ChatMessage message={message} key={index} fetchMessages = {this.fetchMessages}/>
                )
              })}
            </ul>
        </div>
    )
  }
}

export default Chatlist
