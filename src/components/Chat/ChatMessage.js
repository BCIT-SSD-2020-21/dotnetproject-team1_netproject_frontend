import React, { Component } from 'react'
import { UpTriangle, DownTriangle } from '../Icons'

export class ChatMessage extends Component {
 
  constructor (props) {
    super(props)
    this.state = {
      userName: "",
      messageText: "",
      createdOn: "",
    }


  }  

  componentDidMount() {
    const {createdOn, messageText, userName } = this.props
    this.setState({
      userName: userName,
      messageText: messageText,
      createdOn: createdOn
    })


  }
 
  componentDidUpdate(prevProps){
    if (prevProps !== this.props) {
      const {createdOn, messageText, userName } = this.props
      this.setState({
        userName: userName,
        messageText: messageText,
        createdOn: createdOn
      })
        
     }  
  }

  render() {
    const {createdOn, messageText, userName } = this.state
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
    <span className="username">{this.state.userName}</span>
    <span className="message">{this.state.messageText}</span>
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
