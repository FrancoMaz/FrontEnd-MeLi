const express = require('express');
const router = express.Router();
const request = require('request');
const mapResults = require('../utils/mapper');
const mapSearch = mapResults.mapSearch;
const mapDetail = mapResults.mapDetail;
const mcache = require("memory-cache");

const timeoutCache = 10;

let cache = (duration) => {
    return (req, res, next) => {
        let key = req.url;
        let cachedBody = mcache.get(key);
        if (cachedBody) {
            res.send(cachedBody);
        } else {
            res.sendResponse = res.send;
            res.send = (body) => {
                mcache.put(key, body, duration * 1000);
                res.sendResponse(body);
            };
            next();
        }
    }
};

//TODO: manejar errores de servicio

router.get('/', cache(timeoutCache), (req, res, next) => {

    const query = req.query.q;

    try {
        request("https://api.mercadolibre.com/sites/MLA/search?q=" + query, {json: true}, async (err, response, bodySearch) => {
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            let searchResponse = await mapSearch(bodySearch, res, next);
            res.send(JSON.stringify(searchResponse));
        });
    } catch (err) {
        return next();
    }
});

router.get('/:id', cache(timeoutCache), (req, res, next) => {

    try {
        request("https://api.mercadolibre.com/items/" + req.params.id, {json: true}, async (err, response, bodyItem) => {
            request("https://api.mercadolibre.com/items/" + req.params.id + "/description", {json: true}, async (err, response, bodyDescription) => {
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Access-Control-Allow-Origin', '*');
                let detailResponse = await mapDetail(bodyItem, bodyDescription, res, next);
                res.send(JSON.stringify(detailResponse));
            });
        });
    } catch (err) {
        return next()
    }

});

module.exports = router;
