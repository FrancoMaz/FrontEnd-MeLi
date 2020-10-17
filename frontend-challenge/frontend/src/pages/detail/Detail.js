import React from "react";
import './Detail.scss';
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import SearchBox from "../searchbox/SearchBox";
import ErrorMessage from "../../components/error/ErrorMessage";
import {properties} from "../../utils/properties.js";

class Detail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            detailResponse: null
        };
    }

    componentDidMount() {
        this.getDetailResponse();
    }

    getDetailResponse = () => {
        fetch('http://localhost:3001/api/items/' + this.props.match.params.id, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                this.setState({detailResponse: response})
            })
    };

    showDecimals = (item) => {
        let numberOfDecimals = item.price.decimals;
        let decimals = '';
        for (let i = 1; i <= numberOfDecimals; i++) {
            decimals += '0';
        }

        return decimals;

    };

    showDetail = () => {
        let item = this.state.detailResponse.item;
        let description = item.description ?
            <div className="description-section">
                <div className="description-title">{properties.text.description}</div>
                <div className="description">{item.description}</div>
            </div> : null;

        return (
            <div className="detail-product">
                <div className="image-and-item-data">
                    <img className="image" alt={item.title} title={item.title} src={item.picture}/>
                    <div className="item-data">
                        <div className="condition-and-sold">{properties.text[item.condition]} - {item.soldQuantity} {properties.text.sold}</div>
                        <h2 className="title">{item.title}</h2>
                        <div className="price">{item.price.currency} {item.price.amount}
                            <span className="decimals">{this.showDecimals(item)}</span>
                        </div>
                        <button className="buy-button">{properties.text.buy}</button>
                    </div>
                </div>
                {description}
            </div>
        )
    };

    showBreadcrumb = () => {
        let categories = this.state.detailResponse.item.categories;
        return (
            <Breadcrumb categories={categories}/>
        )
    };

    showDetailPage = () => {

        if (!this.state.detailResponse) return null;

        return (this.state.detailResponse.error) ?
            <ErrorMessage message={this.state.detailResponse.error}/> :
            <div className="detail-page">
                {this.showBreadcrumb()}
                {this.showDetail()}
            </div>
    };

    render() {

        return (
            <div className="search-and-detail">
                <SearchBox history={this.props.history}/>
                {this.showDetailPage()}
            </div>
        )
    }
}

export default Detail;