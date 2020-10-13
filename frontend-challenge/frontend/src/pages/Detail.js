import React from "react";
import './Detail.scss';
import Breadcrumb from "./components/Breadcrumb";
import SearchBox from "./SearchBox";


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
        //TODO: agregar decimales al precio
        return (
            <div className="detail-product">
                <div className="image-and-item-data">
                    <img className="image" src={item.picture}/>
                    <div className="item-data">
                        <div className="condition-and-sold">{item.condition} - {item.soldQuantity} vendidos</div>
                        <div className="title">{item.title}</div>
                        <div className="price">{item.price.currency} {item.price.amount}
                            <span className="decimals">{this.showDecimals(item)}</span>
                        </div>
                        <button className="buy-button">Comprar</button>
                    </div>
                </div>
                <div className="description-title">Descripción del producto</div>
                <div className="description">{item.description}</div>
            </div>
        )
    };

    showBreadcrumb = () => {
        let categories = this.state.detailResponse.item.categories;
        return (
            <Breadcrumb categories={categories}/>
        )
    };

    render() {

        if(!this.state.detailResponse)
            return null;

        return (
            <div className="search-and-detail">
                <SearchBox history={this.props.history}/>
                <div className="detail-page">
                    {this.showBreadcrumb()}
                    {this.showDetail()}
                </div>
            </div>
        )
    }
}

export default Detail;