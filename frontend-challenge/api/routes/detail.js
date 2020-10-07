const express = require('express');
const router = express.Router();
const request = require('request');
const mapResponse = require('../utils/mapper');
const mapDetail = mapResponse.mapDetail;

router.get('/', (req, res, next) => { //TODO: add query param to endpoint and add id to request

    request("https://api.mercadolibre.com/items/MLA845818395", { json: true }, (err, response, body) => {
        let responseItem = body;
        request("https://api.mercadolibre.com/items/MLA845818395/description", { json: true }, (err, response, body) => {
            let responseDescription = body;
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.send(JSON.stringify(mapDetail(responseItem, responseDescription)));
        });
    });


});

module.exports = router;