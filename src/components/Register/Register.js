import React from 'react'
import './Register.css'

class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			emailRegister: '',
			passwordRegister: '',
			nameRegister: '',
		}
	}
	onNameChange = (event) => {
		this.setState({nameRegister: event.target.value})
	}
	onEmailChange = (event) => {
		this.setState({emailRegister: event.target.value})
	}
	onPasswordChange = (event) => {
		this.setState({passwordRegister: event.target.value})
	}
	onSubmitChange = (event) =>{
		fetch('https://immense-savannah-23316.herokuapp.com/register',
		{
			method: 'post',
			headers: { 'Content-Type': "application/json"},
			body: JSON.stringify({
				name: this.state.nameRegister,
				email: this.state.emailRegister,
				password: this.state.passwordRegister
			})
		})
		.then(res => res.json())
		.then(user => {
			if (user.id){
			this.props.loadUser(user);
			this.props.onRouteChange('home');
		}
		else this.props.onRouteChange('register');
		})
		this.props.onRouteChange('register')
	}

	render()
	{
		return (
		<article className="br3 ba --white-10 mv4 w-100 w-50-m w-25-l mw8 center">
			<main className="pa4 black-80" style ={{color: '#ffffff'}}>
			  <div className="measure">
			    <fieldset id="sign_up" className="ba b--transparent ph4 mh0">
			      <legend className="f1 fw6 ph0 mh0">Register</legend>
			       <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
			        <input onChange ={this.onNameChange} className=" white ba b--white pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name"/>
			      </div>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
			        <input onChange = {this.onEmailChange}className="white ba b--white pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
			        <input onChange = {this.onPasswordChange}className="white b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 ba b--white" type="password" name="password"  id="password"/>
			      </div>
			    </fieldset>
			    <div className="">
			      <input onClick = {this.onSubmitChange} className="b ph3 pv2 input-reset ba b--black bg-light-red grow pointer f6 dib" type="submit" value="Register"/>
			    </div>
			  </div>
			</main>
		</article>
		)
	}

}

export default Register;