import React from "react";
import './Detail.scss';

class Detail extends React.Component {
    constructor(props) {
        super(props);
    }

    showDetail = () => {
        return (
            <div className="detail-product">
                <div className="image-and-item-data">
                    <div className="image"/>
                        <div className="item-data">
                            <div className="condition-and-sold">Nuevo - 234 vendidos</div>
                            <div className="title">Deco Reverse Sombrero Oxford</div>
                            <div className="price">$ 1.980</div>
                            <button className="buy-button">Comprar</button>
                        </div>
                </div>
                <div className="description-title">Descripción del producto</div>
                <div className="description">Descripción</div>
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