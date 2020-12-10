import React, { Component } from 'react'

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


  submitMessages = () => {
    fetch(`${BASE_URL}Chat`, {
        method: 'POST',
      
        body: JSON.stringify({
            IsComplete:  false, // Set default to false.
            Username: username,
            Message: message,
            CreatedOn: new Date()
        })
    })
    
    .then(res => res.json())
        
        .then(json => {
            console.log(JSON.stringify(json));
            message(''); // Clear input. 
            fetchMessages();
        })
        // Data not retrieved.
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
                <button>Send</button>
              </div>
            </form>
          </div>
        </section>
      )
  }
}

export default SubmitMessage
