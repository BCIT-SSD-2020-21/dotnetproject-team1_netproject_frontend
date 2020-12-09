import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { MailIcon, LockIcon, PictureIcon } from '../Icons'

export class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: "",
      password: "",
    }
  }

  onInputChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  render() {
    const { email, password } = this.state;
    return (
      <section className="Login">
        <div className="form__container">
          <div className="modal-form">
              <div className="modal-head">
                  <h3 className="modal-title">Login</h3>
              </div>
              <form onSubmit={this.onSubmit}>
                  <div className="fieldset">
                    <MailIcon />
                    <input type="text" id="email" name="email" placeholder="email" value={ email } onChange={this.onInputChange}/>
                  </div>

                  <div className="fieldset">
                    <LockIcon />
                    <input type="password" id="password" placeholder="password" name="password"
                    value={ password } onChange={this.onInputChange}/>
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

export default Login
