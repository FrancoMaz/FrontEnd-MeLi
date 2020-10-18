import React from 'react'
import './Result.scss'

class Result extends React.Component {

	//Cuando el usuario hace click en el título o en la imagen se cambia la ruta por la de detalle correspondiente
	routeChange = (newPath) => {
		this.props.history.push(newPath)
	}

	render() {
		return (
			<div className='result'>
				<img
					className='image'
					alt={this.props.data.title}
					title={this.props.data.title}
					src={this.props.data.picture}
					onClick={() => this.routeChange(`/items/${this.props.data.id}`)}
				/>
				<div className='price-title-city'>
					<div className='price-and-title'>
						<div className='price'>
							{this.props.data.price.currency} {this.props.data.price.amount}
						</div>
						<div
							className='title'
							title={this.props.data.title}
							onClick={() => this.routeChange(`/items/${this.props.data.id}`)}
						>
							{this.props.data.title}
						</div>
					</div>
					<div className='city'>{this.props.data.stateName}</div>
				</div>
			</div>
		)
	}
}

export default Result
