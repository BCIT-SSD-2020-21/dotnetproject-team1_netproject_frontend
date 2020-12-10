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

  render() {
      return (
        <section className="SubmitMessage">
          <div className="sm__wrap">
            <form>
              <label id="sm__label">
                <p>Alias:</p>
              </label>
              <div className="fieldset">
                <input type="text" placeholder="Username" value={this.state.username} onChange={(e) => this.onInputChange(e)}/>
              </div>
              <br/>
              <label id="sm__label">
                <p>Message:</p>
              </label>
              <div className="fieldset">
                <input type="text" placeholder="Aa" value={this.state.message} onChange={(e) => this.onInputChange(e)}/>
                <button>Send</button>
              </div>
            </form>
          </div>
        </section>
      )
  }
}

export default SubmitMessage
