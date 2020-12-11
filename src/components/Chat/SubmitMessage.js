import React, {Component } from 'react'
const BASE_URL = 'https://localhost:44363/api/';

export class SubmitMessage extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      message: '',
    }
  }

  onInputChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }


  createMessage = async event => {
      event.preventDefault(); 

      // fetch
      fetch(BASE_URL+'Chat', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            UserName: this.state.username,  
            MessageText: this.state.message
        })
    })
    // Response received.
    .then(response => response.json())
        // Data retrieved.
        .then(json => {
            console.log(JSON.stringify(json));
            this.setState({message:""});
           // Clear input. 
            //fetchMessages();
        })
        // Data not retrieved.
        .catch(function (error) {
            console.log(error);
        })
  }

  onInputChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  
  render() {
      return (
        <section className="SubmitMessage">
          <div className="sm__wrap">
            <form>
              <label id="sm__label">
                <p>Alias:</p>
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
                <button className="button" onClick={this.createMessage}>Send</button>
              </div>
            </form>
          </div>
        </section>
      )
  }
}

export default SubmitMessage
