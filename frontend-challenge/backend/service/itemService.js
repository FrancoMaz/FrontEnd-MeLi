const request = require("superagent");

module.exports = async (id, res) => {

    return await request.get("https://api.mercadolibre.com/items/" + id)
        .timeout(10000)
        .ok(res => res.status < 400 || res.status === 404)
        .then(response => {
            return response.body;
        })
        .catch(err => {
            return next(res.send(JSON.stringify({
                error: "Error temporal. Intente nuevamente más tarde",
                statusCode: 500
            })));
        });
};