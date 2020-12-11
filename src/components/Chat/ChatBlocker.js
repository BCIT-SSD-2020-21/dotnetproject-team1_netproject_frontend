import React from 'react'
import { ChatBubble } from '../Icons'

export default function ChatBlocker() {
  return (
    <div className="ChatBlocker">
      <section className="cb__container">
        <div className="cb__wrap">
          <div className="svg-cont">
            <ChatBubble />
          </div>
          <h2>Welcome to Parlez!</h2>
          <p>Please Log-in or Register to access the Parlez Application</p>
          <div className="cb__buttons">
            <button>Login</button><button>Register</button>
          </div>
        </div>
      </section>
    </div>
  )
}
