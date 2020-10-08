import React from "react";
import './Results.scss';
import Result from "./components/Result";
import Breadcrumb from "./components/Breadcrumb";

class Results extends React.Component {
    constructor(props) {
        super(props);
    }

    showClusterResults = () => {
        let results = this.props.location.state.searchResponse.items; //TODO: pasar esto a state
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

    showBreadcrumb = () => {
        let categories = this.props.location.state.searchResponse.categories;
        return (
            <Breadcrumb categories={categories}/>
        )
    };

    render() {
        return (
            <div className="results-page">
                {this.showBreadcrumb()}
                {this.showClusterResults()}
            </div>
        );
    };

}

export default Results;