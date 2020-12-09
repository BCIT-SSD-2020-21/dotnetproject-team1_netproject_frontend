import React, { Component } from 'react'

export class ChatMessage extends Component {
  render() {
    return (
      <li> 
        <img src="https://pfteza-chatapp.s3-us-west-1.amazonaws.com/iconmonstr-user-20.svg" alt="profile-image" />
        <div className="messageBody">
            
            <span className="username">Frodo Baggins</span> <br/>
            <span className="message">Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero et esse iusto maiores sit omnis itaque minus sint. Ullam, quis.</span>
        </div>

        <div className="messageMeta">
            September 20, 2021&nbsp;•&nbsp;
            <button
              style={{color: "#E52646"}}
            >
                Delete
            </button>
        </div>
      </li>
    )
  }
}

export default ChatMessage
