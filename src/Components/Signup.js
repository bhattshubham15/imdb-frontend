import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { adminRegister } from '../Services';
import { Redirect } from 'react-router-dom';

export default class Signup extends Component {
    state = {
        firstname: '',
        lastname: '',
        mobile_no: '',
        password: '',
        password_confirmation: '',
        touched: {
            firstname: '',
            lastname: '',
            mobile_no: '',
            password: '',
            password_confirmation: '',
        },
        errors: '',
        formIsValid: false,
        token: '',
    }
    componentDidMount() {
        let token = sessionStorage.getItem('token');
        this.setState({
            token
        });
    }
    handleValidation = () => {
        let { firstname, lastname, mobile_no, password, password_confirmation } = this.state;
        let errors = {};
        let formIsValid = true;
        if (!firstname) {
            formIsValid = false;
            errors["firstname"] = "Cannot be empty!";
        }
        if (firstname && typeof firstname !== "undefined") {
            if (!firstname.match(/^[a-zA-Z]+$/)) { // regex for only alphabets
                formIsValid = false;
                errors["firstname"] = "Firstname should have only letters without space.";
            }
        }
        if (!lastname) {
            formIsValid = false;
            errors["lastname"] = "Cannot be empty!";
        }
        if (lastname && typeof lastname !== "undefined") {
            if (!lastname.match(/^[a-zA-Z]+$/)) { // regex for only alphabets
                formIsValid = false;
                errors["lastname"] = "Lastname should have only letters without space.";
            }
        }
        if (!mobile_no) {
            formIsValid = false;
            errors["mobile_no"] = "Cannot be empty!";
        }
        if (mobile_no && typeof mobile_no !== "undefined") {
            if (!mobile_no.match(/^[0-9]{10}$/)) { // regex for only numbers
                formIsValid = false;
                errors["mobile_no"] = "Enter valid mobile number.";
            }
        }
        if (!password) {
            formIsValid = false;
            errors["password"] = "Please enter your password.";
        }

        if (!password_confirmation) {
            formIsValid = false;
            errors["password_confirmation"] = "Please enter your confirm password.";
        }

        if (typeof password !== "undefined" && typeof password_confirmation !== "undefined") {
            if (password != password_confirmation) {
                formIsValid = false;
                errors["password"] = "Passwords don't match.";
            }
        }
        this.setState({
            errors: errors,
            formIsValid,
        });
        return formIsValid;
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        }, () => {
            this.handleValidation()
        });
    }

    handleBlur = (e) => {
        let { touched } = this.state;
        if (e.target.id && touched[e.target.id] != true) {
            touched[e.target.id] = true;
            this.setState({
                touched
            }, () => {
                this.handleValidation()
            });
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        if (this.handleValidation()) {
            const registerResponse = await adminRegister(this.state);
            if (registerResponse) {
                this.setState({
                    firstname: '',
                    lastname: '',
                    mobile_no: '',
                    password: '',
                    password_confirmation: '',
                });
                this.props.history.push("/login-admin");
            }
        } else {
            console.error('error');
        }
    }

    redirectHome = (e) => {
        e.preventDefault();
        this.props.history.push("/admin-login");
    }
    render() {
        if (this.state.token) return <Redirect to='/' />
        return (
            <div className="container">
                <div className="content-container">
                    <div className="form-container">
                        <form>
                            <h1>
                                REGISTER ADMIN
                                </h1>
                            <div className="already-account-link">
                                <Link to="/login-admin">
                                    Already have account?
                                </Link>
                            </div>
                            <div>
                                <span className="subtitle">FIRSTNAME:</span>
                                <span>
                                    <input type="text" name="firstname" id="firstname" onChange={this.handleChange} onBlur={this.handleBlur} />
                                </span>
                                <span className="add-form-error">
                                    {this.state.touched.firstname && this.state.errors.firstname}
                                </span>
                            </div>
                            <div>
                                <span className="subtitle">LASTNAME:</span>
                                <span>
                                    <input type="text" name="lastname" id="lastname" onChange={this.handleChange} onBlur={this.handleBlur} />
                                </span>
                                <span className="add-form-error">
                                    {this.state.touched.lastname && this.state.errors.lastname}
                                </span>
                            </div>
                            <div>
                                <span className="subtitle">MOBILE:</span>
                                <span>
                                    <input type="text" name="mobile_no" id="mobile_no" onChange={this.handleChange} onBlur={this.handleBlur} />
                                </span>
                                <span className="add-form-error">
                                    {this.state.touched.mobile_no && this.state.errors.mobile_no}
                                </span>
                            </div>
                            <div className="row">
                                <div className="column left">
                                    <span className="subtitle">PASSWORD:</span>
                                    <span>
                                        <input type="password" name="password" id="password" onChange={this.handleChange} onBlur={this.handleBlur} />
                                    </span>
                                    <span className="add-form-error">
                                        {this.state.touched.password && this.state.errors.password}
                                    </span>
                                </div>
                                <div className="column right">
                                    <span className="subtitle">CONFIRM PASSWORD:</span>
                                    <span>
                                        <input type="password" name="password_confirmation" id="password_confirmation" onChange={this.handleChange} onBlur={this.handleBlur} />
                                    </span>
                                    <span className="add-form-error">
                                        {this.state.touched.password_confirmation && this.state.errors.password_confirmation}
                                    </span>
                                </div>
                            </div>
                            <div className="center">
                                <input type="submit" value="SUBMIT" disabled={!this.state.formIsValid} className="submit-btn" onClick={this.handleSubmit} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
