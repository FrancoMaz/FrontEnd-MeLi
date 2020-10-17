const CurrencyService = require("../../service/currencyService");
const PriceModel = require("../../model/PriceModel").PriceModel;

//Uso un mapa para almacenar las currencies y no tener que ir al servicio por cada ítem. Key: currency_id, Value: respuesta del servicio
let currenciesMap = new Map();

async function mapPrice(price, currencyId, res, next) {

    let currencyServiceResponse = !currenciesMap.has(currencyId) ? await CurrencyService(currencyId, res, next) : currenciesMap.get(currencyId);

    if (!currenciesMap.hasCurrencyId) {
        currenciesMap.set(currencyId, currencyServiceResponse)
    }

    return new PriceModel(currencyServiceResponse.symbol, price, currencyServiceResponse.decimal_places).toJson()
}

module.exports = {
    mapPrice
};