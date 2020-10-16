const express = require('express');
const router = express.Router();
const request = require('superagent');
const mapResults = require('../utils/mapper');
const mapSearch = mapResults.mapSearch;
const mapDetail = mapResults.mapDetail;
const DescriptionService = require("../service/descriptionService");
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

router.get('/', cache(timeoutCache), (req, res, next) => {

    const query = req.query.q;

    request.get("https://api.mercadolibre.com/sites/MLA/search?q=" + query).timeout(10000)
        .ok(res => res.status < 400 || res.status === 404)
        .then(async response => {

            let body = response.body;
            if (body.error) {
                next(res.send(JSON.stringify({error: body.message, status: body.status})))
            }

            let searchResponse = await mapSearch(body, res, next);

            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');

            res.send(JSON.stringify(searchResponse));
        })
        .catch(err => {
            return next(res.send(JSON.stringify({
                error: "Error temporal. Intente nuevamente más tarde",
                statusCode: 500
            })));
        })
});

router.get('/:id', cache(timeoutCache), (req, res, next) => {

    request.get("https://api.mercadolibre.com/items/" + req.params.id).timeout(10000)
        .ok(res => res.status < 400 || res.status === 404)
        .then(async response => {
            let bodyItem = response.body;
            if (bodyItem.error) {
                next(res.send(JSON.stringify({error: bodyItem.message, status: bodyItem.status})))
            }
            let description = await DescriptionService(req.params.id, res);

            let detailResponse = await mapDetail(bodyItem, description, res, next);

            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');

            res.send(JSON.stringify(detailResponse));

        })
        .catch(err => {
            next(res.send(JSON.stringify({error: "Error temporal. Intente nuevamente más tarde", status: 500})))
        });
});

module.exports = router;
