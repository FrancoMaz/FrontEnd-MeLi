import React from "react";
import './Results.scss';
import Result from "../../components/result/Result";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import SearchBox from "../searchbox/SearchBox";
import ErrorMessage from "../../components/error/ErrorMessage";
import {properties} from "../../utils/properties.js";

class Results extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchResponse: null,
            actualPage: 1,
            resultsPerPage: 4
        };
    }

    componentDidMount() {
        this.getSearchResponse();
    }

    componentDidUpdate(prevprops, prevState) {
        if (this.props.location.search !== prevprops.location.search) {
            this.getSearchResponse();
        }
    }

    getSearchResponse = () => {
        let params = new URLSearchParams(this.props.location.search);

        fetch('http://localhost:3001/api/items?q=' + params.get("search"), {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                this.setState({searchResponse: response});
            })
    };

    showClusterResults = () => {
        let items = this.state.searchResponse.items;

        //En itemPage se agrega el cálculo para saber en qué página debe estar cada ítem.
        //Si un ítem no pertenece a la página no se renderiza el componente Result
        //Decidió hacerse esto en el front ya que lo considero algo visual más que de negocio
        return (
            <div className="cluster-results">
                {items.map((item, index) => {
                    let itemPage = Math.floor((index)/this.state.resultsPerPage + 1);
                    return (
                        (itemPage === this.state.actualPage) ?
                            <Result data={item} history={this.props.history}/> : ""
                    )
                })}
            </div>
        )
    };

    showBreadcrumb = () => {
        let categories = this.state.searchResponse.categories;
        return (
            <Breadcrumb categories={categories}/>
        )
    };

    changePage = (page) => {
      this.setState({actualPage: page})
    };

    showPages = () => {
        let lastPage = Math.floor((this.state.searchResponse.items.length / this.state.resultsPerPage) + 1);
        //Creo un array de n posiciones (siendo n la última página). Como el array empieza en 0 tengo que aumentar los valores en 1
        let pagesToShow = [...Array(lastPage).keys()];
        return (
            <div className="pages">
                {pagesToShow.map((page) => {
                    return (
                        <div className="page" onClick={() => this.changePage(page + 1)}>{page + 1}</div>
                    )
                }
                )}
            </div>
        )
    };

    showResults = () => {

        if (!this.state.searchResponse) return null;

        if (this.state.searchResponse.error) {
            return <ErrorMessage message={this.state.searchResponse.error}/>
        }

        if (this.state.searchResponse.items.length === 0) {
            return <ErrorMessage message={properties.errors.noItemsFound}/>
        }

        return (
            <div className="results-page">
                {this.showBreadcrumb()}
                {this.showClusterResults()}
                {this.showPages()}
            </div>
        )
    };

    render() {

        return (
            <div className="search-and-results">
                <SearchBox history={this.props.history}/>
                {this.showResults()}
            </div>
        );
    };

}

export default Results;