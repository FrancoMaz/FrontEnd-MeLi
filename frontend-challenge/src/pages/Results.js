import React from "react";
import './Results.scss';
import Result from "./components/Result";

class Results extends React.Component {
    constructor(props) {
        super(props);
    }

    showClusterResults = () => {
        let results = this.props.location.state.searchResponse.items;
        return (
            <div className="cluster-results">
                {results.map(item => {
                    return (
                        <Result data={item} history={this.props.history}/>
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