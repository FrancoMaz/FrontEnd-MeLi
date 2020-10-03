"use strict";

class SearchModel {

    constructor(author, categories, items) {
        this._author = author;
        this._categories = categories;
        this._items = items;
    }

    get author() {
        return this._author;
    }

    get categories() {
        return this._categories;
    }

    get items() {
        return this._items;
    }

    toJson(){
        return {
            author: this.author,
            categories: this.categories,
            items: this.items
        }
    }
}

module.exports = {
    SearchModel: SearchModel
};