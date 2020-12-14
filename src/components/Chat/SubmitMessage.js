
import React, {Component } from 'react'
const BASE_URL = 'https://parlezwebapi.azurewebsites.net/api/';

export class SubmitMessage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      messageText: ''
    }
  }

  onInputChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  submitMessages = (e) => {
    e.preventDefault();
    console.log('chat message sent')
    fetch(`${BASE_URL}Chat`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
        body: JSON.stringify({
            userName: this.state.userName,
            messageText: this.state.messageText,
            createdOn: new Date()
        })
    })
    .then(res => res.json())
        .then(json => {
            console.log(JSON.stringify(json));
             this.setState({messageText: ''});
             this.props.didPost();   
        })
        .catch(function (error) {
            console.log(error);
        }) 
}

  render() {
    return (
      <section className="SubmitMessage">

          <div className="sm__wrap">
          <form onSubmit={(e) => this.submitMessages(e)}>
              <label id="sm__label">
                <p>Alias:  </p>
              </label>
              <div className="fieldset">
                <input type="text" placeholder="Username" id="userName" value={this.state.userName} onChange={(e) => this.onInputChange(e)}/>
              </div>
              <br/>
              <label id="sm__label">
                <p>Message:</p>
              </label>
              <div className="fieldset">
                <input type="text" placeholder="Aa" id="messageText" value={this.state.message} onChange={(e) => this.onInputChange(e)}/>
                <button>Send</button>
              </div>
          
          </form>
        </div>
      </section>
    )
  }
}

export default SubmitMessage
