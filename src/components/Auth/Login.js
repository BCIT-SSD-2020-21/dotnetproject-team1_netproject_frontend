import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MailIcon, LockIcon } from '../Icons'


class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  handleSubmit = async event => {
    //Prevent page reload
    event.preventDefault();

    //Integrate Auth here on valid form submission
fetch('https://localhost:44363/Auth/Login', {
  method: 'POST',
  headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
  },
  body: JSON.stringify({
      Email: this.state.email,
      Password: this.state.password
  })
})
// Response received.
.then(response => response.json())
// Data retrieved.
.then(json => {
  console.log(JSON.stringify(json));
  // Store token with session data.
  if(json["status"]=="OK") {
      sessionStorage.setItem('bearer-token', json["token"]);
      console.log(sessionStorage.getItem('bearer-token'))
  }
  else {
      // error message handling
      console.log('Error in Auth/Login');
  }
})
// Data not retrieved.
.catch(function (error) {
  console.log(error);
})
    
  };

  onInputChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  render() {
    return (
      <section className="Login">
         <div className="form__container">
            <div className="modal-form">
              <div className="modal-head">
                    <h3 className="modal-title">Login</h3>
              </div>
          <form onSubmit={this.handleSubmit}>
            <div className="fieldset">
                <MailIcon />
                <input 
                  className="input" 
                  type="text"
                  id="email"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.onInputChange}
                />
            </div>

            <div className="fieldset">
                <LockIcon />
                <input 
                  className="input" 
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onInputChange}
                />
            </div>

            <div className="fieldset submit">
                        <button className="submit">Login</button>
                    </div>
          </form>
          </div>
          <div className="modal-footer">
                <p>Don't have an account? <Link to="/register">Sign up</Link></p>
            </div>
        </div>
      </section>
    )
  }
}

export default Login;
