import React from 'react';
import '../App.scss';
import { FaSearch } from 'react-icons/fa';


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
        fetch('http://localhost:3001/api/items', { //TODO: add query param
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                this.routeChange("/items?search=", response);
            })
    };

    handleInputChange = (event) => {
        this.setState({query: event.target.value});
    };

    render() {
        return (
            <div className="search-page">
                <div className="search-box">
                    <div className="input-and-search">
                        <input className="search-input" type="search" placeholder="Nunca dejes de buscar" onChange={this.handleInputChange}/>
                        <div className="search-button" onClick={this.showOptions}>
                            <FaSearch/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchBox;