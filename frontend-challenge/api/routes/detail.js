const express = require('express');
const router = express.Router();
const request = require('request');
const mapResponse = require('../utils/mapper');
const mapDetail = mapResponse.mapDetail;

router.get('/', (req, res, next) => { //TODO: add query param to endpoint

    request("https://api.mercadolibre.com/items/​MLA863999906", { json: true }, (err, response, body) => {

        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        let responseApi = mapDetail(body);
        res.send(JSON.stringify({ responseApi }));
    });

});

module.exports = router;