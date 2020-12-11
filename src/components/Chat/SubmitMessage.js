
import React, {Component } from 'react'
const BASE_URL = 'https://localhost:44363/api/';

export class SubmitMessage extends Component {
  constructor(props){
    super(props)
    this.state = {
     // id: '',
      userName: '',
      messageText: ''
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
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('bearer-token')}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          
      },
        body: JSON.stringify({
         // id: this.state.id,
            userName: this.state.userName,
            messageText: this.state.messageText,
            createdOn: new Date()
        })
    })
    
    .then(res => res.json())
        
        .then(json => {
            console.log(JSON.stringify(json));
             this.setState('');
            // fetchMessages();
             
        })
        
        .catch(function (error) {
            console.log(error);
        }) 
}


  render() {
      return (
        <section className="SubmitMessage">

          <div className="sm__wrap">
          <form onSubmit={this.submitMessages}>
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
                <input type="text" placeholder="Aa" id="messageText" value={this.state.messageText} onChange={(e) => this.onInputChange(e)}/>
                  <div className="fieldset">
                      <input type="submit" id="submitMessages" name="submitMessages" value="Send"/>
                    </div>
              </div>
            </form>
          </div>
        </section>
      )
  }
}

export default SubmitMessage
