import React from "react";
import './Results.scss';

class Results extends React.Component {
    constructor(props) {
        super(props);
    }

    showClusterResults = () => {
        console.log("Entra");
        let results = this.props.location.state.searchResponse.responseApi.items;
        console.log(results);
        return (
            <div className="cluster-results">
                {results.map(item => {
                    //TODO: pasar a otro componente, y poner bien el precio
                    return (
                        <div className="result">
                            <div className="image"/>
                            <div className="price-and-title">
                                <div className="price">{item.price}</div>
                                <div className="title">{item.title}</div>
                            </div>
                            <div className="city">Buenos Aires</div>
                        </div>
                    )
                })}
            </div>
        )
    };

    render() {
        //TODO: armar el breadcrumb basado en el servicio
        return (
            <div className="results-page">
                <div className="breadcrumb">
                    Electrónica, audio y video > iPod > Reproducciones > iPod Touch > 32 GB
                </div>
                {this.showClusterResults()}
            </div>
        );
    };

}

export default Results;