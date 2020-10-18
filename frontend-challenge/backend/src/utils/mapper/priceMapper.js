const CurrencyService = require("../../service/currencyService");
const PriceModel = require("../../model/PriceModel").PriceModel;

//Uso un mapa para almacenar las currencies y no tener que ir al servicio por cada ítem. Key: currency_id, Value: respuesta del servicio
let currenciesMap = new Map();

async function mapPrice(price, currencyId, res, next) {

    //Voy al servicio de currencies si el id no se encuentra en el mapa. En caso contrario, lo obtengo del mapa
    let currencyServiceResponse = !currenciesMap.has(currencyId) ? await CurrencyService(currencyId, res, next) : currenciesMap.get(currencyId);

    //Si tuve que ir al servicio, almaceno lo obtenido en el mapa
    if (!currenciesMap.hasCurrencyId) {
        currenciesMap.set(currencyId, currencyServiceResponse)
    }

    return new PriceModel(currencyServiceResponse.symbol, price, currencyServiceResponse.decimal_places).toJson()
}

module.exports = {
    mapPrice
};