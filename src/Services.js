import axios from 'axios';
import * as constants from './Constants';
import { toast } from "react-toastify";

export const getGenreList = async () => {
    await fetch(constants.BASE_URL + '/' + constants.GENRE_LIST)
        .then((response) => response.json())
        .then((data) => {
            return data;
        });
}

export const getMovieList = async (page, params) => {
    const movies = await axios.get(constants.BASE_URL + '/' + constants.MOVIE_LIST + '?' + 'page=' + page, {
        params: {
            search_text: params ? params.searchText : '',
            genre_name: params ? params.dropdownSearch : '',
        }
    }).then(function (response) {
        if (response.status === 200 && typeof response === 'object') {
            return response.data;
        }
    }).catch(function (error) {
        console.log(error);
    });
    return movies && movies.data;
}

export const adminLogin = async ({ mobile, password }) => {
    return await axios.post(constants.BASE_URL + '/' + constants.LOGIN, {
        mobile_no: mobile,
        password: password,
    }).then((response) => {
        if (response.status === 200 && response.data.token) {
            toast.success('Logged in successfully');
            return response.data;
        }
    }, (error) => {
        toast.error('Logging error');
        console.log(error);
    });
}

export const adminRegister = async ({ firstname, lastname, mobile_no, password, password_confirmation }) => {
    return await axios.post(constants.BASE_URL + '/' + constants.REGISTER, {
        firstname,
        lastname,
        mobile_no,
        password,
        password_confirmation,
    }).then((response) => {
        if (response.status === 201) {
            toast.success('Registered successfully as ' + firstname);
            return response;
        }
    }, (error) => {
        toast.error('Register error');
        console.log(error);
    });
}

export const getUserDetails = async (token) => {
    return await axios.get(constants.BASE_URL + '/' + constants.USER_DETAILS, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        if (response.status === 200 && response.data.data) {
            return response.data.data;
        }
    }, (error) => {
        sessionStorage.removeItem('token')
    });
}

export const createMovie = async (data, token) => {
    const headers = {
        'Authorization': `Bearer ${token}`,
    };
    return await axios.post(constants.BASE_URL + '/' + constants.CREATE_MOVIE, data, { headers }).then((response) => {
        if (response.status === 200) {
            toast.success('Movie added');
            return response.data;
        }
    }, (error) => {
        toast.error('Error');
        console.log(error);
    });
}

export const addGenre = async (data, token) => {
    const headers = {
        'Authorization': `Bearer ${token}`,
    };
    return await axios.post(constants.BASE_URL + '/' + constants.CREATE_GENRE, { genre_name: data }, { headers }).then((response) => {
        console.log(response, 'genre created successfully');
    }, (error) => {
        console.log(error);
    });
}

export const deleteMovie = async (id, token) => {
    const headers = {
        'Authorization': `Bearer ${token}`,
    };
    return await axios.delete(constants.BASE_URL + '/' + constants.DELETE_MOVIE + '/' + id, { headers }).then((response) => {
        if (response.status === 200) {
            toast.success('Movie deleted successfully');
            return response.data;
        }
    }, (error) => {
        console.log(error);
    });
}

export const getMovieView = async (token, id) => {
    return await axios.get(constants.BASE_URL + '/' + constants.VIEW_MOVIE + '/' + id, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        if (response.status === 200 && response.data) {
            return response.data;
        }
    }, (error) => {
        console.log(error);
    });
}

export const updateMovie = async (data, token, id) => {
    const headers = {
        'Authorization': `Bearer ${token}`,
    };
    return await axios.put(constants.BASE_URL + '/' + constants.UPDATE_MOVIE + '/' + id, data, { headers }).then((response) => {
        if (response.status === 200) {
            toast.success('Movie updated');
            return response.data;
        }
    }, (error) => {
        toast.error('Error');
        console.log(error);
    });
}

