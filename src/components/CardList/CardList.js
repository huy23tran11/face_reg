import React from 'react';
import ImageCard from '../ImageCard/ImageCard'

const CardList = ({imageList})=> {
	const card = imageList.map(image =>{
		return <ImageCard imageLink = {image}/ >
	})
	return (
		<div className = 'dib'>
			{card}
		</div>
		)
}

export default CardList;