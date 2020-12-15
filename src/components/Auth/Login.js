import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { MailIcon, LockIcon, CautionIcon } from '../Icons'
import { withRouter } from 'react-router-dom';

class Login extends Component {
  state = {
    email: "",
    password: "",
    error: {
      message: '',
      active: false,
    }
  };

  handleSubmit = async event => {
    //Prevent page reload
    event.preventDefault();

    //Integrate Auth here on valid form submission
fetch('https://localhost:44363/Auth/Login', {
  method: 'POST',
  headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
  },
  body: JSON.stringify({
      Email: this.state.email,
      Password: this.state.password
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
      sessionStorage.setItem('authUserName', json["username"])
      this.props.history.push("/")
  }
  else {
      // error message handling
      console.log('Error in Auth/Login');
  }
})
// Data not retrieved.
.catch(function (error) {
  console.log(error);
})
    
  };





  validateLogin = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    if(!email && !password){
      this.setState({error: {message: 'You entered invalid information. Please log in again.', active: true,} })
      return null
    }else if(!email){
      this.setState({error: {message: 'Your email is not confirmed. Please enter again.', active: true,} })
      return null
    }else if(!password){
      this.setState({error: {message: 'Your password is wrong. Please enter again', active: true,} })
      return null
    }else{
      this.handleSubmit(e)
    }
  }



  resetErrors = () => {
    setTimeout(() => {
      this.setState({ error: {
        message: '',
        active: false
      }}) 
    }, 4000)
  }



  onInputChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  render() {
    const {  error } = this.state;


    const errorMessage = (
      <Fragment>
        <div className='em__container'>
          <div className="em__wrap">
            <div className="svg-cont">
              <CautionIcon />
            </div>
            <p>{ error.message }</p>
          </div>
        </div>
      </Fragment>
    )



    return (
      <section className="Login">
         <div className="form__container">
            <div className="modal-form">
              <div className="modal-head">
                    <h3 className="modal-title">Login</h3>
              </div>
          <form onSubmit= {(e) => this.validateLogin(e)}>
            <div className="fieldset">
                <MailIcon />
                <input 
                  className="input" 
                  type="text"
                  id="email"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.onInputChange}
                />
            </div>

            <div className="fieldset">
                <LockIcon />
                <input 
                  className="input" 
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onInputChange}
                />
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
        { error.active ? errorMessage : ''}
      </section>
    )
  }
}

export default withRouter(Login);
