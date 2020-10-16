'use strict';
const request = require("superagent");

module.exports = async (itemId) => {

    return await request.get("https://api.mercadolibre.com/items/" + itemId + "/description")
        .timeout(10000)
        .then(response => {
            return response.body;
        })
        .catch(err => {
            return false; //Si falla lo devuelvo igual, solamente que no muestro la descripción
        });
};