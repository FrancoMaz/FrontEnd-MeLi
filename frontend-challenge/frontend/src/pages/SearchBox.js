import React from 'react';
import '../App.scss';
import SearchIcon from '../icons/search.svg';
import { browserHistory } from 'react-router';

class SearchBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            query: ''
        }
    }

    routeChange = (newPath) => {
        this.props.history.push(newPath);
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
                        <div className="search-button" onClick={() => this.routeChange("/items?search=" + this.state.query)}>
                            <img src={SearchIcon}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchBox;