import React from 'react'


const Navigation = ({onRouteChange,isSignedIn,onImageUpdate}) => {
	if(isSignedIn){
		// console.log(isSignedIn);
		return (
			<nav style={{display: 'flex', justifyContent:'flex-end', color: 'white' }}>
				<p onClick= {() => onRouteChange('home')} className ='f3 link dim underline pa3 pointer'>Home</p>
				<p onClick= {() => {onRouteChange('history'); onImageUpdate()}} className ='f3 link dim underline pa3 pointer'>Profile</p>
				<p onClick= {() => onRouteChange('signin')} className ='f3 link dim underline pa3 pointer'>Sign Out</p>
			</nav>
		)
	}
	else {
		// console.log("here",isSignedIn);
		return (
			<nav style={{display: 'flex', justifyContent:'flex-end', color: 'white' }}>
				<p onClick= {() => onRouteChange('signin')} className ='f3 link dim underline pa3 pointer'>Sign In</p>
				<p onClick= {() => onRouteChange('register')} className ='f3 link dim underline pa3 pointer'>Register</p>
			</nav>
		)
	}
}
export default Navigation;