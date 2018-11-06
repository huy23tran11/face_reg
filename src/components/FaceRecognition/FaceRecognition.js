import React from 'react'
import './FaceRecognition.css'

const FaceRecognition = ({imageUrl, box}) =>{
	return (
		(!imageUrl)? <h1> Waiting... </h1>:
		<div className ='center ma'>
			<div className ='absolute mt2'>
				<img id = 'inputmage' alt ='faces' src = {imageUrl} width ='500px' height ='auto'/>
				<div className = 'bounding-box' style = {{top: box.topRow, bottom: box.bottomRow, right: box.rightCol, left: box.left}}></div>
			</div>
		</div>
		)
}

export default FaceRecognition;