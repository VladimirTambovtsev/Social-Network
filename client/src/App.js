import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';


import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';

import Register from './components/auth/Register';
import Login from './components/auth/Login';
import './App.css';

// check JWT
if (localStorage.jwtToken) {
	// Set auth token header 
	setAuthToken(localStorage.jwtToken);
	// Decode token and get user info
	const decoded = jwt_decode(localStorage.jwtToken);
	// Set user and isAuthenticated
	store.dispatch(setCurrentUser(decoded));
	
	// If token expired
	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		// Logout user
		store.dispatch(logoutUser());

		// Clear Profile

		// Redirect
		window.location.href = "/login";
	}
}

class App extends Component {
  render() {
    return (
	<Provider store={ store }>
	    <Router>
	      <div className="App">
	        <Navbar />
	        <Route exact path="/" component={Landing} />
	        <div className="container mt-4">
	        	<Route exact path="/signup" component={Register} />
	        	<Route exact path="/login" component={Login} />
	        </div>
	      </div>
	    </Router>
	</Provider>    
    );
  }
}

export default App;
