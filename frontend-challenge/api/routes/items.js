const express = require('express');
const router = express.Router();
const request = require('request');
const mapResults = require('../utils/mapper');
const mapSearch = mapResults.mapSearch;
const mapDetail = mapResults.mapDetail;

//TODO: manejar errores de servicio y agregar caché

router.get('/', (req, res, next) => {

    const query = req.query.q;

    request("https://api.mercadolibre.com/sites/MLA/search?q=" + query, { json: true }, async (err, response, bodySearch) => {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        let searchResponse = await mapSearch(bodySearch);
        res.send(JSON.stringify(searchResponse));
    });
});

router.get('/:id', (req, res, next) => {

    request("https://api.mercadolibre.com/items/" + req.params.id, { json: true }, async (err, response, bodyItem) => {
        request("https://api.mercadolibre.com/items/" + req.params.id + "/description", { json: true }, async (err, response, bodyDescription) => {
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            let detailResponse = await mapDetail(bodyItem, bodyDescription);
            res.send(JSON.stringify(detailResponse));
        });
    });


});

module.exports = router;
