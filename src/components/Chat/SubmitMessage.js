
import React, { Component, Fragment } from 'react'
const BASE_URL = 'https://localhost:44363/api/';

export class SubmitMessage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      messageText: '',
      isAuthenticated: false,
    }
  }

  componentDidMount(){
    this.checkAuthentication();
  }

  componentDidUpdate(prevProps){
    if(prevProps.authToggle !== this.props.authToggle){
      this.checkAuthentication();
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
          'Authorization': `Bearer ${sessionStorage.getItem('bearer-token')}`,
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

  handleLogout = () => {
    console.log('attempt logout')
    this.setState({ isAuthenticated: false, userName: '', messageText: '' }, () => {
      sessionStorage.clear()
    })
  }

  checkAuthentication(){
    const userToken = sessionStorage.getItem('bearer-token')
    const userName = sessionStorage.getItem('authUserName')
    if( userToken && userName){
      this.setState({isAuthenticated: true, userName: userName})
    }else{
      this.handleLogout()
    }
  }


  render() {
    const { isAuthenticated, userName } = this.state;
    const authInput = (
      <Fragment>
        <label id="sm__label">
          <p>Alias: { userName } </p>
        </label>
      </Fragment>
    )

    const guestInput = (
      <Fragment>
        <label id="sm__label">
          <p>Alias:  </p>
        </label>
        <div className="fieldset">
          <input type="text" placeholder="Username" id="userName" value={this.state.userName} onChange={(e) => this.onInputChange(e)}/>
        </div>
      </Fragment>
    )
    return (
      <section className="SubmitMessage">
          <div className="sm__wrap">
          <form onSubmit={(e) => this.submitMessages(e)}>
              { isAuthenticated ? authInput : guestInput }
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
