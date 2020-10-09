'use strict';
const request = require("superagent");

module.exports = async (currency) => {

    return await request.get("https://api.mercadolibre.com/currencies/" + currency)
        .then(response => {
            return response.body;
        })
        .catch(err => {
            return false;
        });
};