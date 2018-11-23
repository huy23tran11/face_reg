import React from 'react' 

const ImageCard = ({imageLink})=> {
	return (
		<div className= "tc bg-light-green dib br1 pa1 ma2 grow bw2 shadow-5">
			<img alt = 'YourImage' width ='auto' height ='200px' src = {imageLink}/>
			<div>

			</div>
		</div>
		)
}

export default ImageCard;