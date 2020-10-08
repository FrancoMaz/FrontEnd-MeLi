const SearchModel = require("../model/SearchModel").SearchModel;
const DetailModel = require("../model/DetailModel").DetailModel;
const PriceModel = require("../model/PriceModel").PriceModel;
const ItemModel = require("../model/ItemModel").ItemModel;
const CurrencyService = require("../service/currencyService");
const CategoryService = require("../service/categoryService");


async function mapSearch(search) {
    return new SearchModel(
        {name: "Franco", lastname: "Mazzoni"},
        await sortAndMapCategories(search.available_filters[0].values),
        await mapItem(search.results)).toJson()
}

async function mapDetail(item, description) {
    return new DetailModel(
        {name: "Franco", lastname: "Mazzoni"},
        await mapDetailItem(item, description)).toJson()
}

function sortCategories(categories) {
    return categories.sort((a, b) => (a.results < b.results) ? 1 : -1); //Ordeno para quedarme con la categoría que tiene más resultados
}

async function mapCategories(categoryId) {
    let categoriesNames = [];
    let categoryServiceResponse = await CategoryService(categoryId);
    categoryServiceResponse.path_from_root.forEach(category => { //Path_from_root contiene las categorías a devolver en el endpoint, que son las que se deben mostrar en el breadcrumb
        categoriesNames.push(category.name);
    });
    return categoriesNames;
}

async function sortAndMapCategories(categories) {
    let categoriesSorted = sortCategories(categories);
    return await mapCategories(categoriesSorted[0].id)

}

function mapPrice(price, currency) {
    return new PriceModel(currency.symbol, price, currency.decimal_places).toJson()
}

async function mapItem(items) {
    let itemResponses = [];
    let currenciesMap = new Map(); //Uso un mapa para almacenar las currencies y no tener que ir al servicio por cada ítem. Key: currency_id, Value: respuesta del servicio
    let currencyServiceResponse;
    for (item of items) {
        if (!currenciesMap.has(item.currency_id)) {
            currencyServiceResponse = await CurrencyService(item.currency_id);
            currenciesMap.set(item.currency_id, currencyServiceResponse)
        } else {
            currencyServiceResponse = currenciesMap.get(item.currency_id)
        }
        itemResponses.push(new ItemModel(item.id, item.title, mapPrice(item.price, currencyServiceResponse), item.thumbnail, item.condition, item.shipping.free_shipping).toJson());
    }
    return itemResponses
}

async function mapDetailItem(item, description) {
    let currencyServiceResponse = await CurrencyService(item.currency_id);
    let freeShipping = item.shipping ? item.shipping.free_shipping : false;
    //Aclaración: se agrega categories a la respuesta para poder armar el breadcrumb del ítem en la página de detail
    return new ItemModel(item.id, item.title, mapPrice(item.price, currencyServiceResponse), item.thumbnail, item.condition, freeShipping, item.sold_quantity, await mapCategories(item.category_id), description.plain_text).toJson();

}

module.exports = {
    mapSearch: mapSearch,
    mapDetail: mapDetail
};