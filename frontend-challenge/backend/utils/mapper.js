const SearchModel = require("../model/SearchModel").SearchModel;
const DetailModel = require("../model/DetailModel").DetailModel;
const PriceModel = require("../model/PriceModel").PriceModel;
const ItemModel = require("../model/ItemModel").ItemModel;
const CurrencyService = require("../service/currencyService");

//TODO: refactorizar/modularizar el mapper
async function mapSearch(search, res, next) {

    let categories = search.available_filters.filter(filter => filter.id === "category");

    let categoriesToReturn = categories.length > 0 ? await sortAndMapCategories(search.available_filters[0].values) : [];

    return new SearchModel(
        {name: "Franco", lastname: "Mazzoni"},
        categoriesToReturn,
        await mapItem(search.results, res, next)).toJson()
}

async function mapDetail(item, description, res, next) {
    return new DetailModel(
        {name: "Franco", lastname: "Mazzoni"},
        await mapDetailItem(item, description, res, next)).toJson()
}

function mapPrice(price, currency) {
    return new PriceModel(currency.symbol, price, currency.decimal_places).toJson()
}

async function mapItem(items, res, next) {
    let itemResponses = [];
    //Uso un mapa para almacenar las currencies y no tener que ir al servicio por cada ítem. Key: currency_id, Value: respuesta del servicio
    let currenciesMap = new Map();
    let currencyServiceResponse;
    for (let item of items) {
        if (!currenciesMap.has(item.currency_id)) {
            currencyServiceResponse = await CurrencyService(item.currency_id);
            //Si el ítem no tiene currency devuelvo un error
            if (!currencyServiceResponse) {
                next(res.send(JSON.stringify({error: "Problemas con la currency", statusCode: 400})));
            }
            currenciesMap.set(item.currency_id, currencyServiceResponse)
        } else {
            currencyServiceResponse = currenciesMap.get(item.currency_id)
        }
        //Hago el replace en el thumbnail (imagen) para que me traiga la imagen de 90x90
        itemResponses.push(new ItemModel(item.id, item.title, mapPrice(item.price, currencyServiceResponse),
            item.thumbnail.replace("-O.jpg", "-I.jpg"), item.condition, item.shipping.free_shipping, item.address.state_name).toJson());
    }
    return itemResponses
}

async function mapDetailItem(item, description, res, next) {
    let currencyServiceResponse = await CurrencyService(item.currency_id);
    //Si el ítem no tiene currency devuelvo un error
    if (!currencyServiceResponse) {
        next(res.send(JSON.stringify({error: "Problemas con la currency", statusCode: 400})));
    }
    let freeShipping = item.shipping ? item.shipping.free_shipping : false;
    //Aclaración: se agrega categories a la respuesta para poder armar el breadcrumb del ítem en la página de detail
    return new ItemModel(item.id, item.title, mapPrice(item.price, currencyServiceResponse), item.thumbnail, item.condition, freeShipping,
        null, item.sold_quantity, await mapCategories(item.category_id), description.plain_text).toJson();

}

module.exports = {
    mapSearch: mapSearch,
    mapDetail: mapDetail,
    mapPrice: mapPrice,
    sortCategories: sortCategories,
    mapCategories: mapCategories,
    sortAndMapCategories: sortAndMapCategories,
    mapDetailItem: mapDetailItem,
    mapItem: mapItem
};