import React, { Component } from 'react';

class Landing extends Component {
	render() {
		return(
			<div>
				<div className="landing-header">
					<div className="dark-overlay landing-inner text-light">
						<div className="container">
							<div className="row">
								<div className="col-md-12 text-center">
									<h1 className="display-4 mb-4">Developer Connector</h1>
									<p className="lead">Create a developer portfolio, share posts and get help from other develoeprs.</p>
									<hr/>
									<a href="/signup" className="btn btn-lg btn-primary mr-2">Sign up</a>
									<a href="/login" className="btn btn-lg btn-light">Log in</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Landing;