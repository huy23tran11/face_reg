import React from 'react'
import './SignIn.css'

const SignIn = ({onRouteChange}) =>{
	return (
		<article className="br3 ba --white-10 mv4 w-100 w-50-m w-25-l mw8 center">
			<main className="pa4 black-80" style ={{color: '#ffffff'}}>
			  <form className="measure">
			    <fieldset id="sign_up" className="ba b--transparent ph4 mh0">
			      <legend className="f1 fw6 ph0 mh0">Sign In</legend>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" for="email-address">Email</label>
			        <input className="white ba b--white pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6" for="password">Password</label>
			        <input className="white b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 ba b--white" type="password" name="password"  id="password"/>
			      </div>
			    </fieldset>
			    <div className="">
			      <input onClick = {()=>onRouteChange('home')} className="b ph3 pv2 input-reset ba b--black bg-light-red grow pointer f6 dib" type="submit" value="Sign in"/>
			    </div>
			    <div className="lh-copy mt3">
			      <a href="#0" className="f6 link dim white db">Register</a>
			    </div>
			  </form>
			</main>
		</article>
		)
}

export default SignIn;