import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import MultiselectComp from './Multiselect';
import { addGenre, createMovie } from '../Services';

export default class Addmovie extends Component {
    state = {
        token: '',
        name: '',
        director: '',
        popularity: '',
        imdb_score: '',
        genre_name: '',
        touched: {
            popularity: '',
            imdb_score: '',
        },
        errors: '',
        formIsValid: false,
        checkedA: false,
        checkedB: true,
        dropdownSearch: ''
    }
    componentDidMount() {
        const token = sessionStorage.getItem('token');
    }
    handleValidation = () => {
        let { name, director, popularity, imdb_score, genre_name } = this.state;
        let errors = {};
        let formIsValid = true;
        if (!name) {
            formIsValid = false;
            errors["name"] = "Cannot be empty!";
        }
        if (!director) {
            formIsValid = false;
            errors["director"] = "Cannot be empty!";
        }
        if (!popularity) {
            formIsValid = false;
            errors["popularity"] = "Cannot be empty!";
        }
        if (!imdb_score) {
            formIsValid = false;
            errors["imdb_score"] = "Cannot be empty!";
        }
        if (!genre_name) {
            formIsValid = false;
            errors["genre_name"] = "Cannot be empty!";
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
            const token = sessionStorage.getItem('token');
            if (this.state.checkedA) {
                await addGenre(this.state.genre_name, token);
            }
            const data = {
                "name": this.state.name,
                "director": this.state.director,
                "popularity": this.state.popularity,
                "imdb_score": this.state.imdb_score,
                "genre_name": typeof this.state.genre_name == 'object' ? this.state.genre_name : [this.state.genre_name],
            }
            const addMovie = await createMovie(data, token);
            if (addMovie) {
                this.setState({
                    name: '',
                    director: '',
                    popularity: '',
                    imdb_score: '',
                    genre_name: '',
                });
                this.props.history.push("/");
            }
        } else {
            console.error('error');
        }
    }
    switchChange = (event) => {
        this.setState({ [event.target.name]: event.target.checked });
    }
    /**
     * 
     * Handle search for dropdown search
     */
    dropdownSearch = async (value) => {
        this.setState({
            genre_name: value
        }, () => {
            this.handleValidation();
        })
    }
    render() {
        const token = sessionStorage.getItem('token');
        if (!token) return <Redirect to='/' />
        return (
            <div className="container">
                <div className="content-container">
                    <div className="form-container">
                        <form className="row" onSubmit={this.handleSubmit}>
                            <h1>
                                ADD MOVIE DETAILS HERE
                                </h1>
                            <div>
                                <span className="subtitle">MOVIE NAME:</span>
                                <span>
                                    <input type="text" name="name" id="name" value={this.state.name} onChange={this.handleChange} onBlur={this.handleBlur} />
                                </span>
                                <span className="add-form-error">
                                    {this.state.touched.name && this.state.errors.name}
                                </span>
                            </div>
                            <div>
                                <span className="subtitle">DIRECTOR:</span>
                                <span>
                                    <input type="text" name="director" id="director" value={this.state.director} onChange={this.handleChange} onBlur={this.handleBlur} />
                                </span>
                                <span className="add-form-error">
                                    {this.state.touched.director && this.state.errors.director}
                                </span>
                            </div>
                            <div>
                                <span className="subtitle">POPULARITY:</span>
                                <span>
                                    <input type="text" name="popularity" id="popularity" value={this.state.popularity} onChange={this.handleChange} onBlur={this.handleBlur} />
                                </span>
                                <span className="add-form-error">
                                    {this.state.touched.popularity && this.state.errors.popularity}
                                </span>
                            </div>
                            <div>
                                <span className="subtitle">IMDB SCORE:</span>
                                <span>
                                    <input type="text" name="imdb_score" id="imdb_score" value={this.state.imdb_score} onChange={this.handleChange} onBlur={this.handleBlur} />
                                </span>
                                <span className="add-form-error">
                                    {this.state.touched.imdb_score && this.state.errors.imdb_score}
                                </span>
                            </div>
                            <div>
                                <span className="subtitle">GENRE:</span>
                                <div className="switch" style={{ marginBottom: "10px" }}>
                                    <label>
                                        Add existing genre
                                    <input type="checkbox" checked={this.state.checkedA} onChange={this.switchChange} name="checkedA" />
                                        <span className="lever"></span>
                                                Add new genre
                                    </label>
                                </div>
                                {
                                    !this.state.checkedA ?
                                        <MultiselectComp dropdownSearch={this.dropdownSearch} /> :
                                        <div>
                                            <span>
                                                <input type="text" name="genre_name" id="genre_name" value={this.state.genre_name} onChange={this.handleChange} onBlur={this.handleBlur} />
                                            </span>
                                            <span className="add-form-error">
                                                {this.state.touched.genre_name && this.state.errors.genre_name}
                                            </span>
                                        </div>
                                }
                            </div>
                            <div className="center">
                                <input type="submit" value="SUBMIT" className="submit-btn" disabled={!this.state.formIsValid} onClick={this.handleSubmit} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
