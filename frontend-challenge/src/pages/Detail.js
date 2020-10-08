import React from "react";
import './Detail.scss';
import Breadcrumb from "./components/Breadcrumb";

class Detail extends React.Component {
    constructor(props) {
        super(props);
    }

    showDetail = () => {
        let item = this.props.location.state.detailResponse.item; //TODO: pasar esto a state
        //TODO: agregar decimales al precio
        return (
            <div className="detail-product">
                <div className="image-and-item-data">
                    <div className="image"/>
                        <div className="item-data">
                            <div className="condition-and-sold">{item.condition} - {item.soldQuantity} vendidos</div>
                            <div className="title">{item.title}</div>
                            <div className="price">{item.price.currency} {item.price.amount}</div>
                            <button className="buy-button">Comprar</button>
                        </div>
                </div>
                <div className="description-title">Descripción del producto</div>
                <div className="description">{item.description}</div>
            </div>
        )
    };

    showBreadcrumb = () => {
        let categories = this.props.location.state.detailResponse.item.categories;
        return (
            <Breadcrumb categories={categories}/>
        )
    };

    render() {
        return(
            <div className="detail-page">
                {this.showBreadcrumb()}
                {this.showDetail()}
            </div>
        )
    }
}

export default Detail;