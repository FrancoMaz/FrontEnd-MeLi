import React from 'react';
import './SearchBox.scss';
import SearchIcon from '../../icons/search.svg';
import ErrorMessage from "../../components/error/ErrorMessage";

class SearchBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            query: '',
            errorMessage: ''
        }
    }

    handleClick = (newPath) => {
        if (this.state.query !== '') {
            this.props.history.push(newPath);
        } else {
            this.setState({errorMessage: "El campo no puede estar vacío"});
        }
    };

    handleInputChange = (event) => {
        this.setState({query: event.target.value, errorMessage: ''});
    };

    showError() {
        if (this.state.errorMessage !== '') {
            return (
                <ErrorMessage message={this.state.errorMessage}/>
            )
        }

    }

    render() {
        return (
            <div className="search-page">
                <div className="search-box">
                    <div className="input-and-search">
                        <input className="search-input" type="search" placeholder="Nunca dejes de buscar" onChange={this.handleInputChange}/>
                        <div className="search-button" onClick={() => this.handleClick("/items?search=" + this.state.query)}>
                            <img src={SearchIcon} alt="search"/>
                        </div>
                    </div>
                </div>
                {this.showError()}
            </div>
        );
    }
}

export default SearchBox;