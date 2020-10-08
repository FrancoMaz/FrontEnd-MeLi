'use strict';
const request = require("superagent");

module.exports = async (categoryId) => {

    return await request.get("https://api.mercadolibre.com/categories/" + categoryId)
        .then(response => {
            return response.body;
        })
        .catch(err => {
            return false;
        });
};