import React from "react";
import './Result.scss'

class Result extends React.Component {

    constructor(props) {
        super(props);
    }

    routeChange = (newPath) => {
        this.props.history.push(newPath);
    };

    render() {
        //TODO: traer la ciudad del seller del servicio
        return (
            <div className="result">
                <img className="image" src={this.props.data.picture}/>
                <div className="price-title-city">
                    <div className="price-and-title">
                        <div className="price">{this.props.data.price.currency} {this.props.data.price.amount}</div>
                        <div className="title" onClick={() => this.routeChange("/items/" + this.props.data.id)}>{this.props.data.title}</div>
                    </div>
                    <div className="city">{this.props.data.stateName}</div>
                </div>
            </div>
        )
    }
}

export default Result;