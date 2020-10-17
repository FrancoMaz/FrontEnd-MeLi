const request = require("superagent");
const jsonConfig = require('../../resources/config.json');

module.exports = async (query, res) => {

    return await request.get("https://api.mercadolibre.com/sites/MLA/search?q=" + query)
        .timeout(10000)
        .then(response => {
            return response.body;
        })
        .catch(err => {
            let error = jsonConfig.errors.serviceError;
            res.status(error.statusCode).send({ error: error.message });
        });
};