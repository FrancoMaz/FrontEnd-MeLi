import React from "react";
import './Detail.scss';

class Detail extends React.Component {
    constructor(props) {
        super(props);
    }

    showDetail = () => {
        let item = this.props.location.state.detailResponse.item;
        return (
            <div className="detail-product">
                <div className="image-and-item-data">
                    <div className="image"/>
                        <div className="item-data">
                            <div className="condition-and-sold">Nuevo - {item.soldQuantity} vendidos</div>
                            <div className="title">{item.title}</div>
                            <div className="price">$ {item.price}</div>
                            <button className="buy-button">Comprar</button>
                        </div>
                </div>
                <div className="description-title">Descripción del producto</div>
                <div className="description">{item.description}</div>
            </div>
        )
    };

    render() {
        return(
            <div className="detail-page">
                <div className="breadcrumb">
                    Electrónica, audio y video > iPod > Reproducciones > iPod Touch > 32 GB
                </div>
                {this.showDetail()}
            </div>
        )
    }
}

export default Detail;