import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { getUserDetails } from '../Services';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

class Navbar extends Component {
    state = {
        token: '',
        isUserLoggedIn: false,
        profileDropdown: false,

    }
    componentDidMount() {
        let token = sessionStorage.getItem('token');
        if (token) {
            this.getUserDetails(token);
            this.decideRoute(token);
        }
    }
    componentDidUpdate(prevProps, prevState) {
        let token = sessionStorage.getItem('token');
        if (token && prevState.token !== token) {
            this.getUserDetails(token);
            this.decideRoute(token);
        }
    }
    getUserDetails = async (token) => {
        const response = await getUserDetails(token);
        if (response && response.firstname && response.lastname) {
            const initials = response.firstname.charAt(0) + response.lastname.charAt(0)
            this.setState({
                initials: initials.toUpperCase(),
                firstname: response.firstname,
                lastname: response.lastname,
            })
        } else {
            sessionStorage.removeItem('token');
            this.setState({
                token: ''
            })
        }
    }
    decideRoute = (token) => {
        this.setState({
            token
        }, () => {
            if (this.props.location.pathname === '/' && this.state.token) {
                this.setState({
                    isUserLoggedIn: true,
                })
            }
            if (this.props.location.pathname === '/' && !this.state.token) {
                this.setState({
                    isUserLoggedIn: false,
                })
            }
            if (this.props.location.pathname === '/add-movie' && this.state.token) {
                this.setState({
                    isUserLoggedIn: true,
                })
            }
            if (this.props.location.pathname == '/update-movie' && this.state.token) {
                this.setState({
                    isUserLoggedIn: true,
                })
            }
        })
    }
    profileDropdownOpen = (e) => {
        this.setState({
            profileDropdown: e.currentTarget,
        })
    }
    profileDropdownClose = (e) => {
        this.setState({
            profileDropdown: false,
        })
    }
    handleLogout = () => {
        sessionStorage.removeItem('token');
        this.setState({
            token: '',
            isUserLoggedIn: false,
            profileDropdown: false,
        }, () => {
            this.props.history.push("/");
        })
    }

    render() {
        return (
            <div className="navbar-fixed">
                <nav>
                    <div className="nav-wrapper">
                        <Link to="/" className="brand-logo center">
                            IMDb
                        </Link>
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-12">
                                    {
                                        this.state.isUserLoggedIn &&
                                        <Link to="/"
                                            className="btn btn-floating #38d39f lighten-1 right"
                                            style={{ marginRight: "20px", marginTop: "12px" }}
                                            onClick={this.profileDropdownOpen}>
                                            {this.state.initials}
                                        </Link>
                                    }
                                </div>
                                <div className="col-sm-12">
                                    {
                                        this.state.isUserLoggedIn && this.props.location.pathname === '/' ?
                                            <Link to="/add-movie">
                                                <Fab size="small"
                                                    className="btn btn-floating #38d39f lighten-1 left"
                                                    color="primary"
                                                    style={{ marginRight: "20px", marginTop: "12px" }}
                                                    aria-label="add">
                                                    <AddIcon />
                                                </Fab>
                                            </Link> : ''
                                    }
                                </div>
                                <div className="col-sm-12">
                                    {
                                        !this.state.isUserLoggedIn && this.props.location.pathname === '/' ?
                                            <Link to="/login-admin"
                                                className="right"
                                                style={{ marginRight: "20px" }} >
                                                Admin?
                                            </Link> : ''
                                    }
                                </div>
                            </div>
                        </div>
                        <Menu
                            id="simple-menu"
                            anchorEl={this.state.profileDropdown}
                            keepMounted
                            open={this.state.profileDropdown && true}
                            onClose={this.profileDropdownClose}
                        >
                            <MenuItem disabled className="profile-dropdown">
                                Hello, {this.state.firstname + " " + this.state.lastname}
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={this.handleLogout} >Logout</MenuItem>
                        </Menu>
                    </div>
                </nav>
            </div>
        )
    }
}

export default withRouter(Navbar);

