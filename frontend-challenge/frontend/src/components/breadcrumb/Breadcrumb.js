import React from 'react'
import './Breadcrumb.scss'

class Breadcrumb extends React.Component {
	render() {
		const { categories } = this.props
		const separator = '>'
		return (
			<div className='breadcrumb'>
				{categories.map((category) => (
					<div className='category'>
						{category}
						{categories.indexOf(category) < categories.length - 1 && (
							<div className='separator'>{separator}</div>
						)}
					</div>
				))}
			</div>
		)
	}
}

export default Breadcrumb
