import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
	render() {
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
			            <Link className="nav-link" to="#">Link</Link>
			          </li>
			          <li className="nav-item">
			            <Link className="nav-link disabled" to="#">Disabled</Link>
			          </li>
			        </ul>
			         
			      </div>
		      </div>
		    </nav>
		)
	}
}

export default Navbar;