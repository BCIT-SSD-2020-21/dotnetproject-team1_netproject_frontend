import React, { Component } from 'react'

export class Header extends Component {
    render() {
        return (
          <header>
            <section className="header__wrap">
              <div className="header__pseudo">
                <h3 className="white">PARLEZ</h3>
                <ul className="header__navigation">
                  <li><button>Login</button></li>
                  <li><button>Register</button></li>
                </ul>
              </div>
            </section>
          </header>
        )
    }
}

export default Header
