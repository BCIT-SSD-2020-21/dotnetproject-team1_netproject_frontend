import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export class Header extends Component {
  render() {
    return (
      <header>
        <section className="header__wrap">
          <div className="header__pseudo">
            <h3 className="white"><Link to="/">PARLEZ</Link></h3>
          </div>
        </section>
      </header>
    )
  }
}

export default Header
