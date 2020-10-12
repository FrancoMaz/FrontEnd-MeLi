import React from "react";
import './Results.scss';
import Result from "./components/Result";
import Breadcrumb from "./components/Breadcrumb";
import SearchBox from "./SearchBox";

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
                this.setState({searchResponse: response})
            })
    };

    showClusterResults = () => {
        let items = this.state.searchResponse.items;
        return (
            <div className="cluster-results">
                {items.map((item, index) => {
                    let itemPage = Math.floor((index)/this.state.resultsPerPage + 1); //Es el cálculo para saber en qué página debe estar cada ítem. Si un ítem no pertenece a la página no se renderiza el componente Result
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
        let lastPage = Math.floor((this.state.searchResponse.items.length / 4) + 1);
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

    render() {

        if (!this.state.searchResponse) {
            console.log(1);
            return null;
        }

        return (
            <div className="search-and-results">
                <SearchBox history={this.props.history}/>
                <div className="results-page">
                    {this.showBreadcrumb()}
                    {this.showClusterResults()}
                    {this.showPages()}
                </div>
            </div>
        );
    };

}

export default Results;