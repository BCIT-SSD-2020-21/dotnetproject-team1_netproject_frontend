import React, { Component } from 'react'

export class SubmitMessage extends Component {
    render() {
        return (
          <section className="SubmitMessage">
            <div className="sm__wrap">
              <form>
                <label id="sm__label">
                  <p>Post Message</p>
                </label>
                <div className="fieldset">
                  <input type="text" placeholder="Aa"/>
                  <button>Send</button>
                </div>
              </form>
            </div>
          </section>
        )
    }
}

export default SubmitMessage
