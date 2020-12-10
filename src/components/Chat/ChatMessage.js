import React, { Component } from 'react'
import { UpTriangle, DownTriangle } from '../Icons'

export class ChatMessage extends Component {
  render() {
    const {createdOn, messageText, userName } = this.props.message
    console.log(this.props)

    return (
      <li>
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
            <span className="username">{userName}</span>
            <span className="message">{messageText}</span>
            </div>
            <div className="messageMeta">
              {createdOn} &nbsp;•&nbsp;
                <button
                  style={{color: "#E52646"}}
                >
                    Delete
                </button>
            </div>
          </div>
        </div>
      </li>
    )
  }
}

export default ChatMessage
