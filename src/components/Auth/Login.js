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
  if(json["status"]==="OK") {
      sessionStorage.setItem('bearer-token', json["token"]);
      sessionStorage.setItem('authUserName', json["username"])
      this.props.history.push("/")
  }
  else {
      // error message handling
      this.setState({error: {message: 'The validation is failed. Please check again your email and password.', active: true,} })
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

    //  const isEmail = email => {
    //   const emailRegex = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;
    //   return emailRegex.test(email);
    // };
    

    let isEmail = new RegExp( /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    //checks for uppercase
    // if (!isEmail.test(email)) {
    //     this.setState({ isValid: false });
    //     let errors = this.state.errors;
    //     let errorMessage =
    //         "Please ensure the password includes 1 uppercase letter";
    //     errors.push(errorMessage);
    // }



    if(!email && !password){
      this.setState({error: {message: 'You have to enter both your email and password.', active: true,} })
      return null
    }else if(!email){
      this.setState({error: {message: 'Please enter your email.', active: true,} })
      return null
    }else if(!password){
      this.setState({error: {message: 'Please enter your password.', active: true,} })
      return null
    }else if(!isEmail.test(email)){
      this.setState({error: {message: 'Your Email is not valid. Please check your Email again.', active: true,} })
    }
    
    else{
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
