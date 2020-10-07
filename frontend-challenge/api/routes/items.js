const express = require('express');
const router = express.Router();
const request = require('request');
const mapResults = require('../utils/mapper');
const mapSearch = mapResults.mapSearch;
const mapDetail = mapResults.mapDetail;

router.get('/', (req, res, next) => {

    const query = req.query.q;
    console.log(query);

    request("https://api.mercadolibre.com/sites/MLA/search?q=" + query, { json: true }, (err, response, body) => {

        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        let responseApi = mapSearch(body);
        res.send(JSON.stringify({ responseApi }));
    });

});

router.get('/:id', (req, res, next) => {

    request("https://api.mercadolibre.com/items/" + req.params.id, { json: true }, (err, response, body) => {
        let responseItem = body;
        request("https://api.mercadolibre.com/items/" + req.params.id + "/description", { json: true }, (err, response, body) => {
            let responseDescription = body;
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.send(JSON.stringify(mapDetail(responseItem, responseDescription)));
        });
    });


});

module.exports = router;
