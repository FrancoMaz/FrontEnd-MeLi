const sortAndMapCategories = require("./categoriesMapper").sortAndMapCategories;
const mapPrice = require("./priceMapper").mapPrice;
const SearchModel = require("../../model/SearchModel").SearchModel;
const ItemModel = require("../../model/ItemModel").ItemModel;

const jsonConfig = require('../../../resources/config.json');

async function mapSearch(search, res) {

    let categories = search.available_filters.filter(filter => filter.id === "category");

    let categoriesToReturn = categories.length > 0 ? await sortAndMapCategories(search.available_filters[0].values) : [];

    return new SearchModel(
        jsonConfig.author,
        categoriesToReturn,
        await mapResultsItem(search.results, res)).toJson()
}

async function mapResultsItem(items, res) {
    let itemResponses = [];

    for (let item of items) {
        //Hago el replace en el thumbnail (imagen) para que me traiga la imagen de 90x90
        itemResponses.push(new ItemModel(item.id, item.title, await mapPrice(item.price, item.currency_id, res),
            item.thumbnail.replace("-O.jpg", "-I.jpg"), item.condition, item.shipping.free_shipping, item.address.state_name).toJson());
    }
    return itemResponses
}

module.exports = {
  mapSearch,
  mapResultsItem
};