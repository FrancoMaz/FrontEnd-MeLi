const express = require('express');
const router = express.Router();
const request = require('request');
const mapResponse = require('../utils/mapper');

router.get('/', (req, res, next) => { //TODO: add query param to endpoint

    //const query = req.params.query;

    request("https://api.mercadolibre.com/sites/MLA/search?q=" + "app", { json: true }, (err, response, body) => {

        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        let responseApi = mapResponse(body);
        res.send(JSON.stringify({ responseApi }));
    });

});

module.exports = router;
