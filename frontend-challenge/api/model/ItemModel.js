"use strict";

class ItemModel {

    constructor(id, title, price, picture, condition, free_shipping) {
        this._id = id;
        this._title = title;
        this._price = price;
        this._picture = picture;
        this._condition = condition;
        this._freeShipping = free_shipping;
    }

    get id() {
        return this._id;
    }

    get title() {
        return this._title;
    }

    get price() {
        return this._price;
    }

    get picture() {
        return this._picture;
    }

    get condition() {
        return this._condition;
    }

    get freeShipping() {
        return this._freeShipping;
    }

    toJson(){
        return {
            id: this.id,
            title: this.title,
            price: this.price,
            picture: this.picture,
            condition: this.condition,
            freeShipping: this.freeShipping
        }
    }
}

module.exports = {
    ItemModel: ItemModel
};