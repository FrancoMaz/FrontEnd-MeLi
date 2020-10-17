const request = require("superagent");
const jsonConfig = require('../../resources/config.json');

module.exports = async (id, res) => {

    return await request.get("https://api.mercadolibre.com/items/" + id)
        .timeout(10000)
        .ok(res => res.status < 400 || res.status === 404)
        .then(response => {
            if (response.status === 404) {
                let error = jsonConfig.errors.itemNotFound;
                res.status(error.statusCode).send({ error: error.message });
                return false;
            }
            return response.body;
        })
        .catch(err => {
            let error = jsonConfig.errors.serviceError;
            res.status(error.statusCode).send({ error: error.message });
        });
};