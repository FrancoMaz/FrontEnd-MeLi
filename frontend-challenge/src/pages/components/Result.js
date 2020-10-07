import React from "react";

class Result extends React.Component {

    constructor(props) {
        super(props);
    }

    routeChange = (newPath, response) => {
        this.props.history.push({
            pathname: newPath,
            state: { detailResponse: response }
        });
    };

    showDetail = () => {
        fetch('http://localhost:3001/api/items/' + this.props.data.id, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                this.routeChange("/items/" + this.props.data.id, response);
            })
    };

    render() {
        //TODO: traer la ciudad del seller del servicio
        return (
            <div className="result">
                <div className="image"/>
                <div className="price-and-title">
                    <div className="price">{this.props.data.price.currency} {this.props.data.price.amount}</div>
                    <div className="title" onClick={this.showDetail}>{this.props.data.title}</div>
                </div>
                <div className="city">Buenos Aires</div>
            </div>
        )
    }
}

export default Result;