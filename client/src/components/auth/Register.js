import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import axios from 'axios';
import classnames from 'classnames';

class Register extends Component {
	constructor() {
		super();
		this.state = {
			name: '',
			email: '',
			password: '',
			password2: '',
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
		const newUser = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
			password2: this.state.password2
		};
		
		axios.post('/api/users/register', newUser)
			.then(result => console.log(result.data))
			.catch(err => this.setState({ errors: err.response.data }));
	}

	render() {
		const { errors } = this.state;

		return (
			<div className="register">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h1 className="text-center display-4">Sign Up</h1>
			 				<p className="text-center">Create a new profile today</p>
			 				<form noValidate onSubmit={this.onSubmit}>
			 				  <div className="form-group">
							    <label htmlFor="exampleInputText1">Your Name</label>
							    <input 
							    	className={classnames('form-control', { 'is-invalid': errors.name })} 
							    	onChange={this.onChange} value={this.state.name} name="name" type="text" id="exampleInputText1" placeholder="Enter Name" />
							    	{errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
							  </div>

							  <div className="form-group">
							    <label htmlFor="exampleInputEmail1">Email address</label>
							    <input className={classnames('form-control', { 'is-invalid': errors.email })} 
							    	onChange={this.onChange} value={this.state.email} name="email" type="email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
							    {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
							  </div>
							 
							  <div className="form-group">
							    <label htmlFor="exampleInputPassword1">Password</label>
							    <input className={classnames('form-control', { 'is-invalid': errors.password })} 
							    	onChange={this.onChange} value={this.state.password} name="password" type="password" id="exampleInputPassword1" placeholder="Password" />
							    {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
							  </div>

							  <div className="form-group">
							    <label htmlFor="exampleInputPassword2">Repeat your Password</label>
							    <input className={classnames('form-control', { 'is-invalid': errors.password2 })} 
							    	onChange={this.onChange} value={this.state.password2} name="password2" type="password" id="exampleInputPassword2" placeholder="Confirm Password" />
							    {errors.password2 && (<div className="invalid-feedback">{errors.password2}</div>)}
							  </div>
							  <button type="submit" className="btn btn-primary mt-4">Create an account</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Register;