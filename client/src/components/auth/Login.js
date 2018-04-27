import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class Login extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
			errors: {}
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}
	onSubmit(e) {
		e.preventDefault();
		const user = { 
			email: this.state.email,
			password: this.state.password, 
		};

		console.log(user);
	}

	render() {
		return (
			<div className="login">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="text-center display-4">Log in</h1>
			 				<p className="text-center">We're glad to see you again</p>
			 				<form onSubmit={this.onSubmit}>
							  <div className="form-group">
							    <label htmlFor="exampleInputEmail1">Email address</label>
							    <input onChange={this.onChange} value={this.state.email} name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
							    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
							  </div>
							 
							  <div className="form-group">
							    <label htmlFor="exampleInputPassword1">Password</label>
							    <input onChange={this.onChange} value={this.state.password} name="password" type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
							  </div>

							  <button type="submit" className="btn btn-block btn-primary mt-5">Submit</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Login;