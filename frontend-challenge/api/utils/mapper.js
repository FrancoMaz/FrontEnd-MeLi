const request = require('superagent');

const SearchModel = require("../model/SearchModel").SearchModel;
const DetailModel = require("../model/DetailModel").DetailModel;
const PriceModel = require("../model/PriceModel").PriceModel;
const ItemModel = require("../model/ItemModel").ItemModel;
const CurrencyService = require("../service/currencyService");

async function mapSearch(search) {
    return new SearchModel(
        {name: "Franco", lastname: "Mazzoni"},
        mapCategories(search.available_filters[0].values),
        await mapItem(search.results)).toJson()
}

async function mapDetail(item, description) {
    return new DetailModel(
        {name: "Franco", lastname: "Mazzoni"},
        await mapDetailItem(item, description)).toJson()
}

function mapCategories(categories) {
    let categoriesNames = [];
    categories.forEach(category => {
        categoriesNames.push(category.name);
    });
    return categoriesNames;
}

function mapPrice(price, currency) {
    return new PriceModel(currency.symbol, price, currency.decimal_places).toJson()
}

//TODO: agregar caché al request de currency
async function mapItem(items) {
    let itemResponses = [];
    for (item of items) {
        let currencyServiceResponse = await CurrencyService(item.currency_id);
        itemResponses.push(new ItemModel(item.id, item.title, mapPrice(item.price, currencyServiceResponse), item.thumbnail, item.condition, item.shipping.free_shipping).toJson());
    }
    return itemResponses
}

async function mapDetailItem(item, description) {
    let currencyServiceResponse = await CurrencyService(item.currency_id);
    return new ItemModel(item.id, item.title, mapPrice(item.price, currencyServiceResponse), item.thumbnail, item.condition, item.shipping.free_shipping, item.sold_quantity, description.plain_text).toJson();

}

module.exports = {
    mapSearch: mapSearch,
    mapDetail: mapDetail
};