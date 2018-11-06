import React from 'react'
import './ImageLinkForm.css'

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
	return (
		<div>
			<p className = 'f3'>
				{'Link your image right here'}
			</p>
			<div className ='ma3 pa4 br5 shadow-5 center w-60 form' >
				<input className = 'f4 pa2 w-70' 
						type ='text'
						onChange ={onInputChange}/> 

				<button className = 'grow link dib pa3 bg-light-red w-30 f3'
						onClick = {onButtonSubmit}>Detect</button> 
			</div>
		</div>
	)
}

export default ImageLinkForm;