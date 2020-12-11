import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { MailIcon, LockIcon, PictureIcon } from '../Icons'

export class Registration extends Component {
  render() {
    return (
      <section className="Login">
        <div className="form__container">
          <div className="modal-form">
            <div className="modal-head">
              <h3 className="modal-title">Register</h3>
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

              <div className="fieldset">
                <LockIcon />
                <input type="password" id="password" placeholder="confirm password" name="password" />
              </div>

              <div className="fieldset label">
                <label>Upload a profile picture:</label>
              </div>
              <div className="fieldset">
                <PictureIcon /><input type="file" placeholder="upload profile" />
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
