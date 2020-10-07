const SearchModel = require("../model/SearchModel").SearchModel;
const DetailModel = require("../model/DetailModel").DetailModel;
const ItemModel = require("../model/ItemModel").ItemModel;

function mapSearch(body) {
    return new SearchModel(
        {name: "Franco", lastname: "Mazzoni"},
        mapCategories(body.available_filters[0].values),
        mapItem(body.results)).toJson()
}

function mapDetail(item, description) {
    return new DetailModel(
        {name: "Franco", lastname: "Mazzoni"},
        mapDetailItem(item, description)).toJson()
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

function mapDetailItem(item, description) {
    //TODO: agregar picture y description (pegarle a la otra API), cambiar formato del precio
    return new ItemModel(item.id, item.title, item.price, "", item.condition, item.shipping.free_shipping, item.sold_quantity, description.plain_text).toJson();
}

module.exports = {
    mapSearch: mapSearch,
    mapDetail: mapDetail
};