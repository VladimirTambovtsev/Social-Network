import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

// Register
export const registerUser = (userData, history) => dispatch => {
	axios.post('/api/users/register', userData)
			.then(result => history.push('/login'))
			.catch(err => dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			}));
};


// Login
export const loginUser = userData => dispatch => {
	axios.post('api/users/login', userData)
		.then(res => {
			// Save to localStorage
			const { token } = res.data;
			localStorage.setItem('jwtToken', token);
			// Send token to auth header
			setAuthToken(token);
			// Decode jwt token to get user data
			const decoded = jwt_decode(token);
			// Set current user
			dispatch(setCurrentUser(decoded));
		})
		.catch(err => dispatch({
				type: GET_ERRORS,
				payload: err.response.data
		}));
}

// Set logged in user
export const setCurrentUser = decoded => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded
	}
}

// Log user out and remove token
export const logoutUser = () => dispatch => {
	localStorage.removeItem('jwtToken');
	// Remove auth header for future requests
	setAuthToken(false);
	// Set current user to {}, makes isAuthenticated to false
	dispatch(setCurrentUser({}));
};



