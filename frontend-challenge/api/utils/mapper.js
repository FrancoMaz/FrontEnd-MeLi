const SearchModel = require("../model/SearchModel").SearchModel;
const ItemModel = require("../model/ItemModel").ItemModel;

function mapResponse(body) {
    return new SearchModel(
        {name: "Franco", lastname: "Mazzoni"},
        mapCategories(body.available_filters[0].values),
        mapItem(body.results)).toJson()
}

function mapCategories(categories) {
    let categoriesNames = [];
    categories.forEach(category => {
        categoriesNames.push(category.name);
    });
    return categoriesNames;
}

function mapItem(items) {
    let itemResponses = [];
    items.forEach(item => {
        //TODO: map price and get picture url
        itemResponses.push(new ItemModel(item.id, item.title, item.price, "", item.condition, item.shipping.free_shipping).toJson());
    });
    return itemResponses
}

module.exports = mapResponse;