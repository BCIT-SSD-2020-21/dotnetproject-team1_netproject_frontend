import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export class Header extends Component {
  constructor(props){
    super(props);
    this.state = {
      isAuthenticated: false
    }
  }

  componentDidMount(){
    const userToken = sessionStorage.getItem('bearer-token')
    const userName = sessionStorage.getItem('username')
  }

  render() {
    return (
      <header>
        <section className="header__wrap">
          <div className="header__pseudo">
            <h3 className="white"><Link to="/">PARLEZ</Link></h3>
            <ul className="header__navigation">
              <li><button>Login</button></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </ul>
          </div>
        </section>
      </header>
    )
  }
}

export default Header
