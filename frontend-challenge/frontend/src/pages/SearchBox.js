import React from 'react';
import '../App.scss';
import SearchIcon from '../icons/search.svg';

class SearchBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            query: ''
        }
    }

    routeChange = (newPath, response) => {
        this.props.history.push({
            pathname: newPath,
            state: { searchResponse: response }
        });
    };

    showOptions = () => {
        fetch('http://localhost:3001/api/items?q=' + this.state.query, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                this.routeChange("/items?search=", response); //TODO: hacer que esta pag sea independiente
            })
    };

    handleInputChange = (event) => {
        this.setState({query: event.target.value});
    };

    render() {
        //TODO: NO USAR FASEARCH, agregar el svg a mano
        return (
            <div className="search-page">
                <div className="search-box">
                    <div className="input-and-search">
                        <input className="search-input" type="search" placeholder="Nunca dejes de buscar" onChange={this.handleInputChange}/>
                        <div className="search-button" onClick={this.showOptions}>
                            <img src={SearchIcon}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchBox;