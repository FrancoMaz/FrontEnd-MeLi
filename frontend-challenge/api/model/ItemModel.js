"use strict";

class ItemModel {

    constructor(id, title, price, picture, condition, free_shipping, sold_quantity, categories, description) {
        this._id = id;
        this._title = title;
        this._price = price;
        this._picture = picture;
        this._condition = condition;
        this._freeShipping = free_shipping;
        this._soldQuantity = sold_quantity;
        this._categories = categories;
        this._description = description;
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

    get soldQuantity() {
        return this._soldQuantity;
    }

    get categories() {
        return this._categories;
    }

    get description() {
        return this._description;
    }

    toJson(){
        return {
            id: this.id,
            title: this.title,
            price: this.price,
            picture: this.picture,
            condition: this.condition,
            freeShipping: this.freeShipping,
            soldQuantity: this.soldQuantity,
            categories: this.categories,
            description: this.description
        }
    }
}

module.exports = {
    ItemModel: ItemModel
};