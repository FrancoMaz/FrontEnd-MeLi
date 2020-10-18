const sortAndMapCategories = require("./categoriesMapper").sortAndMapCategories;
const mapPrice = require("./priceMapper").mapPrice;
const SearchModel = require("../../model/SearchModel").SearchModel;
const ItemModel = require("../../model/ItemModel").ItemModel;

const jsonConfig = require('../../../resources/config.json');

//Función que devuelve la respuesta a devolver al front
async function mapSearch(search, res) {

    //Las categorías se obtienen del campo available_filters del servicio, y se las ordena por cantidad de resultados
    //Para la categoría de mayor cantidad de resultados, se va al servicio de categorías con el id de la misma
    //Para el autor se utiliza el json resources/config.json
    let categories = search.available_filters.filter(filter => filter.id === "category");
    let categoriesToReturn = categories.length > 0 ? await sortAndMapCategories(search.available_filters[0].values) : [];

    return new SearchModel(
        jsonConfig.author,
        categoriesToReturn,
        await mapResultsItem(search.results, res)).toJson()
}

//Función que devuelve el array con todos los ítems a devolver
async function mapResultsItem(items, res) {
    let itemResponses = [];

    for (let item of items) {
        //Hago el replace en el thumbnail (imagen) para que me traiga la imagen de 90x90 (ya que el servicio devuelve la imágen en tamaño original)
        //Se optó por agregar el campo stateName (además de los pedidos), ya que se necesita agregar en el front
        itemResponses.push(new ItemModel(item.id, item.title, await mapPrice(item.price, item.currency_id, res),
            item.thumbnail.replace("-O.jpg", "-I.jpg"), item.condition, item.shipping.free_shipping, item.address.state_name).toJson());
    }
    return itemResponses
}

module.exports = {
  mapSearch,
  mapResultsItem
};