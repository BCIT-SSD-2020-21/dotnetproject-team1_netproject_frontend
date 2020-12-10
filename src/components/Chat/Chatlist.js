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
      isAuthenticated: true, messages: []
    }
  }

componentDidMount = () => {
  this.fetchMessages()

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
                return( <li key= {index}>
                  <div className="chat__container"> 
                    <div className="chat__col left">
                        <div className="img-container">
                          <img src="https://pfteza-chatapp.s3-us-west-1.amazonaws.com/iconmonstr-user-20.svg" alt="profile-image" />
                        </div>
                        <div className="rating">
                            <span className="rating__container">
                                <button><UpTriangle/></button>
                                <span className="rating__int">+1</span>
                                <button><DownTriangle/></button>
                            </span>
                        </div>
                    </div>
                    <div className="chat__col right">
                      <div className="messageBody">
              <span className="username">{message.userName}</span>
              <span className="message">{message.messageText}</span>
                      </div>
                      <div className="messageMeta">
                        {message.createdOn} &nbsp;•&nbsp;
                          <button
                            style={{color: "#E52646"}}
                          >
                              Delete
                          </button>
                      </div>
                    </div>
                  </div>
                </li>)
              })


              }

                {/* <ChatMessage />
                <ChatMessage />
                <ChatMessage />
                <ChatMessage />
                <ChatMessage />
                <ChatMessage />
                <ChatMessage /> */}
            </ul>
        </div>
    )
  }
}

export default Chatlist
