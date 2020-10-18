import React from 'react'
import './Detail.scss'
import Breadcrumb from '../../components/breadcrumb/Breadcrumb'
import SearchBox from '../searchbox/SearchBox'
import ErrorMessage from '../../components/error/ErrorMessage'
import { properties } from '../../utils/properties.js'

class Detail extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			detailResponse: null,
		}
	}

	componentDidMount() {
		this.getDetailResponse()
	}

	//Acá voy al back, dado el id de la url. Si viene la respuesta la agrego al state
	getDetailResponse = () => {
		fetch(`http://localhost:3001/api/items/${this.props.match.params.id}`, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.catch((error) => console.error('Error:', error))
			.then((response) => {
				this.setState({ detailResponse: response })
			})
	}

	//Muestro un 0 por la cantidad de decimales que me devolvió el servicio (depende de la currency)
	//Luego de hacer varias pruebas, no se encontraron casos donde aparezcan ya precios con decimales, por lo que se optó por hacer de esta forma
	showDecimals = (item) => {
		const numberOfDecimals = item.price.decimals
		let decimals = ''
		for (let i = 1; i <= numberOfDecimals; i++) {
			decimals += '0'
		}

		return decimals
	}

	//Muestro el detalle de la página. Si la descripción viene vacía, entonces no muestro dicha sección
	showDetail = () => {
		const { item } = this.state.detailResponse
		const description = item.description ? (
			<div className='description-section'>
				<div className='description-title'>{properties.text.description}</div>
				<div className='description'>{item.description}</div>
			</div>
		) : null

		return (
			<div className='detail-product'>
				<div className='image-and-item-data'>
					<img
						className='image'
						alt={item.title}
						title={item.title}
						src={item.picture}
					/>
					<div className='item-data'>
						<div className='condition-and-sold'>
							{properties.text[item.condition]} -{item.soldQuantity}{' '}
							{properties.text.sold}
						</div>
						<h2 className='title'>{item.title}</h2>
						<div className='price'>
							{item.price.currency} {item.price.amount}
							<span className='decimals'>{this.showDecimals(item)}</span>
						</div>
						<button className='buy-button'>{properties.text.buy}</button>
					</div>
				</div>
				{description}
			</div>
		)
	}

	//Muestro el breadcrumb. Si no vinieron categorías, no se muestran en la página (categories está vacío
	showBreadcrumb = () => {
		const { categories } = this.state.detailResponse.item
		return <Breadcrumb categories={categories} />
	}

	//Se muestra la página de detalle. No se muestra nada hasta que venga la respuesta del servicio
	//Cuando llega la respuesta, si vino bien del servicio, entonces se muestra el detalle; en caso contrario, se muestra el error correspondiente
	showDetailPage = () => {
		if (!this.state.detailResponse) return null

		return this.state.detailResponse.error ? (
			<ErrorMessage message={this.state.detailResponse.error} />
		) : (
			<div className='detail-page'>
				{this.showBreadcrumb()}
				{this.showDetail()}
			</div>
		)
	}

	render() {
		return (
			<div className='search-and-detail'>
				<SearchBox history={this.props.history} />
				{this.showDetailPage()}
			</div>
		)
	}
}

export default Detail
