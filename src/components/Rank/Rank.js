import React from 'react'

const Rank = ({name, entires}) => {
	return (
		<div>
			<div className ='f3'>
				{`${name} , your current entry count is...`}
			</div>

			<div className ='white f1'>
				{console.log('rank',entires)}
				{entires}
			</div>
		</div>
	)
}

export default Rank;