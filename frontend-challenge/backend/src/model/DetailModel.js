"use strict";

class DetailModel {

    constructor(author, item) {
        this._author = author;
        this._item = item;
    }

    get author() {
        return this._author;
    }

    get item() {
        return this._item;
    }

    toJson(){
        return {
            author: this.author,
            item: this.item
        }
    }
}

module.exports = {
    DetailModel: DetailModel
};