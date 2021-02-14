import React, { Component } from 'react'
import JumbotronSection from './Jumbotron';
import { getMovieList } from '../Services';
import Movies from './Movies';
import InfiniteScroll from 'react-infinite-scroll-component';
import MultiselectComp from './Multiselect';

export default class MovieList extends Component {
    state = {
        movies: [],
        page: 1,
        userDetails: '',
        loading: true,
        search: {
            searchText: '',
            dropdownSearch: ''
        },
        token: '',
        deleteMovie: false,
    }
    async componentDidMount() {
        const movies = await getMovieList(this.state.page);
        const token = sessionStorage.getItem('token');
        this.setState({
            movies: movies ? movies.data : '',
            token
        })
    }
    async componentDidUpdate(prevProps, prevState) {
        if (this.state.page !== prevState.page) {
            this.setState({
                loading: true
            })
            const movies = await getMovieList(this.state.page);
            const token = sessionStorage.getItem('token');
            if (movies) {
                const newmovieList = [...this.state.movies, ...movies.data];
                this.setState({
                    movies: newmovieList,
                    loading: false
                })
            }
            this.setState({
                token,
            })
            const locationId = sessionStorage.getItem('locationId');
            if (locationId) {
                sessionStorage.removeItem('locationId')
            }
        }
    }
    /**
     * Handle search for text search
     */
    handleSearch = async (e) => {
        e.preventDefault();
        this.setState({
            search: {
                ...this.state.search,
                searchText: e.target.value
            }
        }, async () => {
            const movies = await getMovieList(this.state.page, this.state.search);
            if (movies) {
                this.setState({
                    movies: movies.data,
                })
            }
        })
    }
    /**
     * 
     * Handle search for dropdown search
     */
    dropdownSearch = async (value) => {
        this.setState({
            search: {
                ...this.state.search,
                dropdownSearch: value
            }
        }, async () => {
            const movies = await getMovieList(this.state.page, this.state.search);
            if (movies) {
                this.setState({
                    movies: movies.data,
                })
            }
        })
    }
    /**
     * Delete update
     */
    movieDeleted = async () => {
        this.setState({
            loading: true,
            deleteMovie: !this.state.deleteMovie
        })
        const movies = await getMovieList(this.state.page);
        const token = sessionStorage.getItem('token');
        if (movies) {
            this.setState({
                movies: movies.data,
                loading: false
            })
        }
        this.setState({
            token,
        })
    }
    render() {
        const token = sessionStorage.getItem('token');
        return (
            <div className="row" >
                <JumbotronSection textChange={this.handleSearch} />
                <MultiselectComp dropdownSearch={this.dropdownSearch} />
                <InfiniteScroll
                    dataLength={this.state.movies.length}
                    next={() => this.setState({ page: this.state.page + 1 })}
                    hasMore={true}
                >
                    <div className="grid-container">
                        {this.state.movies && this.state.movies.map((item, index) => {
                            return (
                                <Movies item={item} key={index} isEdit={token} movieDeleted={this.movieDeleted} />
                            )
                        })}
                        <div className="white-text center">
                            {this.state.loading && 'Loading...'}
                        </div>
                    </div>
                </InfiniteScroll>
            </div>
        )
    }
}
