import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { MailIcon, LockIcon } from '../Icons'

export class Login extends Component {
  render() {
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
                <input type="text" id="email" name="email" placeholder="email" />
              </div>

              <div className="fieldset">
                <LockIcon />
                <input type="password" id="password" placeholder="password" name="password" />
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
