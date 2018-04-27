import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

class Navbar extends Component {
	onLogoutClick(e) {
		e.preventDefault();
		this.props.logoutUser();
	}

	render() {
		const { isAuthenticated, user } = this.props.auth;
		const authLinks = (
			<ul className="navbar-nav ml-auto">
				<li className="nav-item">
					<a onClick={this.onLogoutClick.bind(this)} className="nav-link text-info" href="#">
						<img 
							className="rounded-circle"
							src={user.avatar} 
							alt={user.name} style={{ width: '25px', marginRight: '10px' }} 
							title="You must have a gravatar connected to your email to dispaly and image" />
						Logout
					</a>
				</li>
			</ul>
		);
		const guestLinks = (
			<ul className="navbar-nav ml-auto">
				<li className="nav-item">
					<Link className="nav-link disabled text-primary" to="/">Sign Up</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="/login">Login</Link>
				</li>
			</ul>
		);
		return (
			<nav className="navbar navbar-expand-md navbar-dark bg-dark">
			  <div className="container">
			      <Link className="navbar-brand" to="/">DevConnector</Link>
			      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
			        <span className="navbar-toggler-icon"></span>
			      </button>

			      <div className="collapse navbar-collapse" id="navbarsExample04">
			        <ul className="navbar-nav mr-auto">
			          <li className="nav-item active">
			            <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
			          </li>
			          <li className="nav-item">
			            <Link className="nav-link" to="/dashboard">Dashboard</Link>
			          </li>
			          <li className="nav-item">
			            <Link className="nav-link disabled" to="#">Disabled</Link>
			          </li>
			        </ul>
			        {isAuthenticated ? authLinks : guestLinks}
			      </div>
		      </div>
		    </nav>
		)
	}
}

Navbar.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth
});


export default connect(mapStateToProps, { logoutUser })(Navbar);