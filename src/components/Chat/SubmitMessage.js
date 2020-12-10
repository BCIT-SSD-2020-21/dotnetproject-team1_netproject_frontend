import React, { Component } from 'react'
import Chat from '../Chat'
import ChatMessage from './ChatMessage'
import ChatBlocker from './ChatBlocker'
import Chatlist from './Chatlist'


const BASE_URL = "https://localhost:44363/api/";

export class SubmitMessage extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      message: ''
    }
  }

  onInputChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }


  submitMessages = () => {
    fetch(`${BASE_URL}Chat`, {
        method: 'POST',
        body: JSON.stringify({
            userName: this.state.username,
            messageText: this.state.message,
            createdOn: new Date()
        })
    })
    
    .then(res => res.json())
        
        .then(json => {
            console.log(JSON.stringify(json));
            this.setState('');
        })
        
        .catch(function (error) {
            console.log(error);
        }) 
}




  render() {
      return (
        <section className="SubmitMessage">
          <div className="sm__wrap">
            <form>
              <label id="sm__label">
                <p>Alias:  </p>
              </label>
              <div className="fieldset">
                <input type="text" placeholder="Username" id="username" value={this.state.username} onChange={(e) => this.onInputChange(e)}/>
              </div>
              <br/>
              <label id="sm__label">
                <p>Message:</p>
              </label>
              <div className="fieldset">
                <input type="text" placeholder="Aa" id="message" value={this.state.message} onChange={(e) => this.onInputChange(e)}/>
                <form onSubmit={this.submitMessages}>  <div className="fieldset">
                      <input type="submit" id="submitMessages" name="submitMessages" value="Send"/>
                    </div></form>
              </div>
            </form>
          </div>
        </section>
      )
  }
}

export default SubmitMessage
