import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Navbar from './Components/Navbar';
import MovieList from './Components/MovieList';
import Watchmovie from './Components/Watchmovie';
import Login from './Components/Login';
import Signup from './Components/Signup';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Addmovie from './Components/Addmovie';
import Updatemovie from './Components/Updatemovie';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <ToastContainer />
          <div>
            <Navbar />
            <Switch>
              <Route exact path="/" component={MovieList} />
              <Route path="/watch-movie/:id" component={Watchmovie} />
              <Route path="/login-admin" component={Login} />
              <Route path="/signup-admin" component={Signup} />
              <Route path="/add-movie" component={Addmovie} />
              <Route path="/update-movie" component={Updatemovie} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    )
  };
}

export default App;
