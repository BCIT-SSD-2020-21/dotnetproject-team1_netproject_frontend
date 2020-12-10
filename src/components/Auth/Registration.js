import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { MailIcon, LockIcon, PictureIcon } from '../Icons'

export class Registration extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: "",
      password: "",
      confirmpassword: "",
    }
  }

  onInputChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }


  handleSubmit = async (event) => {
    event.preventDefault()
    
      //Integrate Auth here on valid form submission
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
          console.log(JSON.stringify(json));
          // Store token with session data.
          if(json["status"]=="OK") {
              sessionStorage.setItem('bearer-token', json["token"]);
              console.log(sessionStorage.getItem('bearer-token'))
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
  }
    
  render() {
      const { email, password, confirmpassword } = this.state;
      return (
        <section className="Login">
          <div className="form__container">
            <div className="modal-form">
                <div className="modal-head">
                    <h3 className="modal-title">Register</h3>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <div className="fieldset">
                      <MailIcon />
                      <input type="text" id="email" name="email" placeholder="email" value={ email } onChange={this.onInputChange}/>
                    </div>

                    <div className="fieldset">
                      <LockIcon />
                      <input type="password" id="password" placeholder="password" name="password" value={ password } onChange={this.onInputChange}/>
                    </div>

                    <div className="fieldset">
                      <LockIcon />
                      <input type="password" id="confirmpassword" placeholder="confirm password" name="password" value={ confirmpassword } onChange={this.onInputChange}/>
                    </div>

                    <div className="fieldset label">
                        <label>Upload a profile picture:</label>
                    </div>
                    <div className="fieldset">
                        <PictureIcon /><input type="file" placeholder="upload profile"/>
                    </div>

                    <div className="fieldset submit">
                        <button className="submit">Register</button>
                    </div>
                </form>
            </div>
            <div className="modal-footer">
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </div>
          </div>
      </section>
      )
  }
}

export default Registration
