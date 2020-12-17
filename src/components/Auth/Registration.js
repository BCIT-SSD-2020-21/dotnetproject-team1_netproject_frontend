import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MailIcon, LockIcon } from '../Icons'
import { withRouter } from 'react-router-dom';

class Register extends Component { 
  //state variables for form inputs and errors
    state = {
    email: "",
    password: "",
    confirmpassword: ""
  }

  handleSubmit = async event => {
    //Prevent page reload
    event.preventDefault();
    
    fetch('https://localhost:44363/Auth/Register', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        Email: this.state.email,
        Password: this.state.password,
        ConfirmPassword: this.state.confirmpassword
    })
})
// Response received.
.then(response => response.json())
// Data retrieved.
.then(json => {
    // Store token with session data.
    if(json["status"]==="OK") {
        sessionStorage.setItem('bearer-token', json["token"]);
        sessionStorage.setItem('authUserName', json["username"])
        this.props.history.push("/")
    }
    else {
        // error message handling
        console.log('Error in Auth/Register');
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
  }

  render() {
    return (
      <section className="Login">
        <div className="form__container">
        <div className="modal-form">
          <div className="modal-head">
          <h3 className="modal-title">Register</h3>
          <form onSubmit={this.handleSubmit}>
            <div className="fieldset">
            <MailIcon />
                <input 
                  className="input" 
                  type="email"
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
            
            <div className="fieldset">
            <LockIcon />
                <input 
                  className="input" 
                  type="password"
                  id="confirmpassword"
                  placeholder="Confirm password"
                  value={this.state.confirmpassword}
                  onChange={this.onInputChange}
                />
            </div>
            <div className="fieldset submit">
                <button className="submit">Register</button>
            </div>
          </form>

            </div>
          </div>
          <div className="modal-footer">
                  <p>Already have an account? <Link to="/login">Login</Link></p>
          </div>
        </div>
      </section>
    );
  }
}
export default withRouter(Register);
