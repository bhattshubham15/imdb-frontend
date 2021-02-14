import React, { Component } from 'react'
import { adminLogin } from '../Services'
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

export default class Login extends Component {
    state = {
        mobile: '',
        password: '',
        token: '',
    }
    componentDidMount() {
        let token = sessionStorage.getItem('token');
        this.setState({
            token
        });
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        })
    }
    handlesubmit = async (e) => {
        e.preventDefault();
        if (this.state.mobile && this.state.password) {
            const loginResponse = await adminLogin(this.state);
            if (loginResponse && loginResponse.token) {
                sessionStorage.setItem('token', loginResponse.token)
                this.props.history.push("/");
            }
        }
    }
    render() {
        if (this.state.token) return <Redirect to='/' />
        return (
            <div className="container">
                <div className="content-container">
                    <div className="form-container">
                        <form onSubmit={this.handlesubmit}>
                            <h1>
                                Login
                                </h1>
                            <div className="already-account-link">
                                <Link to="/signup-admin">
                                    New user?
                                </Link>
                            </div>
                            <div>
                                <span className="subtitle">MOBILE:</span>
                                <span>
                                    <input type="text" name="mobile" id="mobile" value={this.state.mobile} onChange={this.handleChange} />
                                </span>
                            </div>
                            <div>
                                <span className="subtitle">PASSWORD:</span>
                                <span>
                                    <input type="password" name="password" id="password" value={this.state.password} onChange={this.handleChange} />
                                </span>
                            </div>
                            <div className="center">
                                <input type="submit" value="SUBMIT" className="submit-btn" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
