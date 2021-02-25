import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';

class Register extends Form {
	state = {
		data: {
			username: '',
			password: '',
			name: ''
		},
		errors: {}
	};

	schema = {
		username: Joi.string().required().label('Username').email({
			minDomainSegments: 2,
			tlds: { allow: [ 'com', 'net', 'ie' ] }
		}),
		password: Joi.string().required().label('Password').min(3).max(15),
		name: Joi.string().required().label('Name')
	};

	doSubmit = () => {
		//Call the server
		console.log('Registered');
	};

	render() {
		return (
			<div>
				<h1>Register</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput('username', 'Username')}
					{this.renderInput('password', 'Password', 'password')}
					{this.renderInput('name', 'Name')}
					{this.renderButton('Register')}
				</form>
			</div>
		);
	}
}

export default Register;
