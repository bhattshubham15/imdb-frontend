import React, { Component } from 'react'
import watchMovie from "../Assets/watch_movie.svg";

export default class Watchmovie extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <img style={{ maxHeight: "50%", maxWidth: "50%" }} src={watchMovie} alt="watch_movie" />
                    </div>
                </div>
            </div>
        )
    }
}
