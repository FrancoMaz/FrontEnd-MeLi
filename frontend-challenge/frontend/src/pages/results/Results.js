import React from 'react'
import './Results.scss'
import Result from '../../components/result/Result'
import Breadcrumb from '../../components/breadcrumb/Breadcrumb'
import SearchBox from '../searchbox/SearchBox'
import ErrorMessage from '../../components/error/ErrorMessage'
import { properties } from '../../utils/properties.js'

class Results extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			searchResponse: null,
			actualPage: 1,
			resultsPerPage: 4,
		}
	}

	componentDidMount() {
		this.getSearchResponse()
	}

	//Si no se hace el fetch al actualizar la url, entonces no se puede realizar una rebúsqueda desde la página de resultados
	componentDidUpdate(prevprops, prevState) {
		if (this.props.location.search !== prevprops.location.search) {
			this.getSearchResponse()
		}
	}

	//Voy al back a buscar la respuesta de search. Si viene bien la respuesta la guardo en el state
	getSearchResponse = () => {
		const params = new URLSearchParams(this.props.location.search)

		fetch(`http://localhost:3001/api/items?q=${params.get('search')}`, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.catch((error) => console.error('Error:', error))
			.then((response) => {
				this.setState({ searchResponse: response })
			})
	}

	//Se muestra el cluster de resultados, dependiendo de la página donde está posicionado el usuario
	showClusterResults = () => {
		const { items } = this.state.searchResponse

		// En itemPage se agrega el cálculo para saber en qué página debe estar cada ítem.
		// Si un ítem no pertenece a la página no se renderiza el componente Result
		// Decidió hacerse esto en el front ya que lo considero algo visual más que de negocio
		return (
			<div className='cluster-results'>
				{items.map((item, index) => {
					const itemPage = Math.floor(index / this.state.resultsPerPage + 1)
					return itemPage === this.state.actualPage ? (
						<Result data={item} history={this.props.history} />
					) : (
						''
					)
				})}
			</div>
		)
	}

  //Muestro el breadcrumb. Si no vinieron categorías, no se muestran en la página (categories está vacío
	showBreadcrumb = () => {
		const { categories } = this.state.searchResponse
		return <Breadcrumb categories={categories} />
	}

	//Al cambiar de página, se actualiza la página donde está posicionado el usuario
	changePage = (page) => {
		this.setState({ actualPage: page })
	}

	//Se muestra la sección donde están las páginas
	showPages = () => {
		//La última página depende de la cantidad de resultados que vinieron del back
		const lastPage = Math.floor(
			this.state.searchResponse.items.length / this.state.resultsPerPage + 1
		)
		//Creo un array de n posiciones (siendo n la última página). Como el array empieza en 0 tengo que aumentar los valores en 1
		const pagesToShow = [...Array(lastPage).keys()]
		return (
			<div className='pages'>
				{pagesToShow.map((page) => (
					<div className='page' onClick={() => this.changePage(page + 1)}>
						{page + 1}
					</div>
				))}
			</div>
		)
	}

	//Se muestra la página de resultados
  //No se muestra nada hasta que venga la respuesta del servicio
	//Si vino un error del servicio, o si no hay ítems, se muestra el error correspondiente
	showResults = () => {
		if (!this.state.searchResponse) return null

		if (this.state.searchResponse.error) {
			return <ErrorMessage message={this.state.searchResponse.error} />
		}

		if (this.state.searchResponse.items.length === 0) {
			return <ErrorMessage message={properties.errors.noItemsFound} />
		}

		return (
			<div className='results-page'>
				{this.showBreadcrumb()}
				{this.showClusterResults()}
				{this.showPages()}
			</div>
		)
	}

	render() {
		return (
			<div className='search-and-results'>
				<SearchBox history={this.props.history} />
				{this.showResults()}
			</div>
		)
	}
}

export default Results
