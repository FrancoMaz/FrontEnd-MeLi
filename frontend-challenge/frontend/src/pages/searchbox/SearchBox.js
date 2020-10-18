import React from 'react'
import './SearchBox.scss'
import SearchIcon from '../../icons/search.svg'
import ErrorMessage from '../../components/error/ErrorMessage'
import { properties } from '../../utils/properties.js'

class SearchBox extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			query: '',
			errorMessage: '',
		}
	}

	//Al realizar una búsqueda, se actualiza el path si la búsqueda es válida, y se setea el mensaje de error si el campo está vacío
	handleClick = (newPath) => {
		if (this.state.query !== '') {
			this.props.history.push(newPath)
		} else {
			this.setState({ errorMessage: properties.errors.emptyField })
		}
	}

	//Se actualiza la query a medida que el usuario escribe en el input de búsqueda
	handleInputChange = (event) => {
		this.setState({ query: event.target.value, errorMessage: '' })
	}

	//Si hubo algún error se muestra el mensaje correspondiente (en este caso solo puede suceder si se quiso buscar con el input vacío)
	showError() {
		if (this.state.errorMessage !== '') {
			return <ErrorMessage message={this.state.errorMessage} />
		}
	}

	render() {
		return (
			<div className='search-page'>
				<div className='search-box'>
					<div className='input-and-search'>
						<input
							className='search-input'
							type='search'
							placeholder={properties.text.placeholder}
							onChange={this.handleInputChange}
						/>
						<div
							className='search-button'
							onClick={() =>
								this.handleClick(`/items?search=${this.state.query}`)
							}
						>
							<img src={SearchIcon} alt='search' />
						</div>
					</div>
				</div>
				{this.showError()}
			</div>
		)
	}
}

export default SearchBox
