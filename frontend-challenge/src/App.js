import React from 'react';
import './App.scss';
import { FaSearch } from 'react-icons/fa';

function showOptions() {
    fetch('http://localhost:3001/api/items', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            console.log(response)
        })
}

class App extends React.Component {
  render() {
        return (
            <div className="search-page">
                <div className="search-box">
                    <div className="input-and-search">
                        <input className="search-input" type="search" placeholder="Nunca dejes de buscar"/>
                        <div className="search-button" onClick={showOptions}>
                            <FaSearch/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;