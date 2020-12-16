import React, { Component } from "react";
import { Link } from "react-router-dom";
import { MailIcon, LockIcon } from "../Icons";
import { withRouter } from "react-router-dom";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            isValid: true,
            confirmpassword: "",
            errors: [],
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let input = this.state.input;
        input[event.target.name] = event.target.value;

        this.setState({ input });
    }

    resetErrors() {
        this.setState({ errors: [] });
    }

    validate(event) {
        event.preventDefault();
        console.log(this.state.email);
        let email = this.state.email;
        let password = this.state.password;
        let confirmpassword = this.state.confirmpassword;

        if (!email) {
            this.setState({ isValid: false });
            let errors = this.state.errors;
            let errorMessage = "Please enter your email address";
            errors.push(errorMessage);
        }

        let pattern = new RegExp(
            /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
        );
        if (!pattern.test(email)) {
            this.setState({ isValid: false });
            let errors = this.state.errors;
            let errorMessage = "Not a valid email address";

            errors.push(errorMessage);
        }

        let upperCase = new RegExp(/^(?=.*[A-Z])/);

        //checks for uppercase
        if (!upperCase.test(password)) {
            this.setState({ isValid: false });
            let errors = this.state.errors;
            let errorMessage =
                "Please ensure the password includes 1 uppercase letter";
            errors.push(errorMessage);
        }

        let lowerCase = new RegExp(/^(?=.*[a-z])/);

        //checks for lowercase
        if (!lowerCase.test(password)) {
            this.setState({ isValid: false });
            let errors = this.state.errors;
            let errorMessage =
                "Please ensure the password includes 1 lowercase letter";
            errors.push(errorMessage);
        }

        let digits = new RegExp(/^(?=.*[0-9])/);
        //checks for a number
        if (!digits.test(password)) {
            this.setState({ isValid: false });
            let errors = this.state.errors;
            let errorMessage = "Please ensure the password includes a number";
            errors.push(errorMessage);
        }

        let special = new RegExp(/^(?=.*[!@#$&*])/);

        //checks for a special character
        if (!special.test(password)) {
            this.setState({ isValid: false });
            let errors = this.state.errors;
            let errorMessage =
                "Please ensure the password includes a special !, @, #, $, or &* character";
            errors.push(errorMessage);
        }

        let passLength = new RegExp(/^(?=.*[A-Za-z\d$@$!%*?&]{7})/);

        //Checks the password length
        if (!passLength.test(password)) {
            this.setState({ isValid: false });
            let errors = this.state.errors;
            let errorMessage = "Password length must be a min of 7";
            errors.push(errorMessage);
        }

        //Check matching password
        if (confirmpassword != password) {
            this.setState({ isValid: false });
            let errors = this.state.errors;
            let errorMessage = "The passwords do not match";
            errors.push(errorMessage);
        }
    }

    handleSubmit = async (event) => {
        //Prevent page reload
        event.preventDefault();

        fetch("https://localhost:44363/Auth/Register", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Email: this.state.email,
                Password: this.state.password,
                ConfirmPassword: this.state.confirmpassword,
            }),
        })
            // Response received.
            .then((response) => response.json())
            // Data retrieved.
            .then((json) => {
                // Store token with session data.
                if (json["status"] == "OK") {
                    sessionStorage.setItem("bearer-token", json["token"]);
                    sessionStorage.setItem("authUserName", json["username"]);
                    this.props.history.push("/");
                } else {
                    // error message handling
                    console.log("Error in Auth/Register");
                }
            })
            // Data not retrieved.
            .catch(function (error) {
                console.log(error);
            });
    };

    onInputChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value,
        });
    };

    render() {
        const { isValid, errors } = this.state;
        return (
            <section className="Login">
                <div className="form__container">
                    <div className="modal-form">
                        <div className="modal-head">
                            <h3 className="modal-title">Register</h3>

                            {isValid
                                ? null
                                : errors.map((err) => {
                                      return <div>{err}</div>;
                                  })}
                            <form
                                onSubmit={(e) => this.validate(e)}
                                onChange={(e) => this.resetErrors(e)}
                            >
                                <div className="fieldset">
                                    <MailIcon />
                                    <input
                                        className="input"
                                        //type="email"
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
                                <div style={{ fontSize: 16, color: "red" }}>
                                    {this.state.errors.password}
                                </div>

                                <div className="fieldset">
                                    <LockIcon />
                                    <input
                                        className="input"
                                        type="password"
                                        id="confirmpassword"
                                        placeholder="Confirm password"
                                        value={this.state.confirmpassword}
                                        onChange={this.onInputChange}
                                    />
                                </div>
                                <div style={{ fontSize: 16, color: "red" }}>
                                    {this.state.errors.confirmpassword}
                                </div>
                                <div className="fieldset submit">
                                    <button className="submit">Register</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <p>
                            Already have an account?{" "}
                            <Link to="/login">Login</Link>
                        </p>
                    </div>
                </div>
            </section>
        );
    }
}

export default withRouter(Register);
