import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';
import { UserIcon } from './Icons'

export class Header extends Component {
  constructor(props){
    super(props);
    this.state = {
      isAuthenticated: false, 
      username: '',
    }
  }

  componentDidMount(){
    const userToken = sessionStorage.getItem('bearer-token')
    const userName = sessionStorage.getItem('authUserName')
    if( userToken && userName){
      this.setState({isAuthenticated: true, username: userName})
    }
  }

  handleLogout = () => {
    console.log('attempt logout')
    this.setState({ isAuthenticated: false}, () => {
      sessionStorage.clear()
    })
  }

  render() {
    const { isAuthenticated, username } = this.state;
    const authLinks = (
      <Fragment>
        <ul className="header__navigation">
          <li><button onClick={() => this.handleLogout()}>Logout</button></li>
          <li className="icon">{username} <div className="svg-cont"><UserIcon /></div></li>
        </ul>
      </Fragment>
    )

    const guestLinks = (
      <Fragment>
        <ul className="header__navigation">
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul>
      </Fragment>
    )

    return (
      <header>
        <section className="header__wrap">
          <div className="header__pseudo">
            <h3 className="white"><Link to="/">PARLEZ</Link></h3>
            { isAuthenticated ? authLinks : guestLinks}
          </div>
        </section>
      </header>
    )
  }
}

export default Header
