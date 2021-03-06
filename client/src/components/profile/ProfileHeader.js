import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';

class ProfileHeader extends Component {
	render() {
		const { profile } = this.props;
		return (
			<div className="row">
				<div className="col-md-12">
					<div className="card card-body bg-info text-white mb-3">
						<div className="row">
							<div className="col-4 col-md-3 m-auto">
								<img src={profile.user.avatar} alt={profile.user.name} className="profiles-img rounded-circle"/>
							</div>
						</div>
						<div className="text-center">
							<div className="display-4 text-center">{profile.user.name}</div>
							<p className="lead text-center">{profile.status} {isEmpty(profile.company ? null : (<span>at ${profile.company}</span>))}</p>
							{isEmpty(profile.location ? null : (<p>at ${profile.location}</p>))}
							<p>
								{isEmpty(profile.website) ? null : (
									<Link to={profile.website} target="_blank" className="text-white p-2"><i className="fas fa-globe fa-2x" /></Link>
								)}
								{isEmpty(profile.social && profile.social.twitter) ? null : (
									<Link to={profile.social.twitter} target="_blank" className="text-white p-2"><i className="fab fa-twitter  fa-2x" /></Link>
								)}
								{isEmpty(profile.social && profile.social.facebook) ? null : (
									<Link to={profile.social.facebook} target="_blank" className="text-white p-2"><i className="fab fa-facebook  fa-2x" /></Link>
								)}
								{isEmpty(profile.social && profile.social.linkedin) ? null : (
									<Link to={profile.social.linkedin} target="_blank" className="text-white p-2"><i className="fab fa-linkedin  fa-2x" /></Link>
								)}
								{isEmpty(profile.social && profile.social.vk) ? null : (
									<Link to={profile.social.vk} target="_blank" className="text-white p-2"><i className="fab fa-vk  fa-2x" /></Link>
								)}
								{isEmpty(profile.social && profile.social.youtube) ? null : (
									<Link to={profile.social.youtube} target="_blank" className="text-white p-2"><i className="fab fa-youtube  fa-2x" /></Link>
								)}
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}


export default ProfileHeader;