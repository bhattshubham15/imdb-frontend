import React, { Component } from 'react'
import netflixImage from "../Assets/netflix_image.svg";
import { Link } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { deleteMovie } from '../Services';


export default class Movies extends Component {
    handleDelete = (id) => {
        const token = sessionStorage.getItem('token');
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        const deletemovie = await deleteMovie(id, token);
                        if (deletemovie) {
                            this.props.movieDeleted();
                        }
                    }
                },
                {
                    label: 'No',
                    onClick: () => {
                        return;
                    }
                }
            ]
        });
    }
    render() {
        let { genre_name } = this.props.item;
        genre_name = genre_name.replace(/[/\s/[/\][/]+/g, '');
        return (
            <div className="card">
                <div className="card-image">
                    <img src={netflixImage} />

                </div>
                <div className="card-content">
                    <span className="card-title white-text">
                        {this.props.item.name}
                    </span>
                    <div className="white-text">
                        <span className="star-rating">
                            <svg width="24" height="12" xmlns="http://www.w3.org/2000/svg"
                                className="ipc-icon ipc-icon--star-inline" viewBox="0 0 24 24"
                                fill="currentColor" role="presentation">
                                <path d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z">
                                </path>
                            </svg>
                        </span>
                        <span>
                            {this.props.item.imdb_score}
                        </span>
                    </div>
                    <div className="white-text">
                        Directed by: {this.props.item.director}
                        <span>
                            <p>
                                Genres: {genre_name}
                            </p>
                        </span>
                    </div>
                </div>
                <div className="card-action white-text">
                    <Link to={{ pathname: "/watch-movie/" + this.props.item.id }} className={`card-wrapper restore-${this.props.item.id}`}>
                        Watch now
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="ipc-icon ipc-icon--launch ipc-button__icon ipc-button__icon--post" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M16 16.667H8A.669.669 0 0 1 7.333 16V8c0-.367.3-.667.667-.667h3.333c.367 0 .667-.3.667-.666C12 6.3 11.7 6 11.333 6h-4C6.593 6 6 6.6 6 7.333v9.334C6 17.4 6.6 18 7.333 18h9.334C17.4 18 18 17.4 18 16.667v-4c0-.367-.3-.667-.667-.667-.366 0-.666.3-.666.667V16c0 .367-.3.667-.667.667zm-2.667-10c0 .366.3.666.667.666h1.727L9.64 13.42a.664.664 0 1 0 .94.94l6.087-6.087V10c0 .367.3.667.666.667.367 0 .667-.3.667-.667V6h-4c-.367 0-.667.3-.667.667z"></path></svg>
                    </Link>
                    {
                        this.props.isEdit &&
                        <div>
                            <Fab size="small" color="primary" aria-label="add">
                                <DeleteIcon onClick={() => this.handleDelete(this.props.item.id)} />
                            </Fab>
                            <Link to={{pathname: "/update-movie", id: this.props.item.id}} id={this.props.item.id}>
                                <Fab size="small" color="secondary" aria-label="edit">
                                    <EditIcon />
                                </Fab>
                            </Link>
                        </div>
                    }
                </div>
            </div>
        )
    }
}
