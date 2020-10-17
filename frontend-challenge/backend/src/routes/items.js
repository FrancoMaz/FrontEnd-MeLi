const express = require('express');
const router = express.Router();
const mcache = require("memory-cache");

const mapSearch = require('../utils/mapper/searchMapper').mapSearch;
const mapDetail = require('../utils/mapper/detailMapper').mapDetail;
const DescriptionService = require("../service/descriptionService");
const SearchService = require("../service/searchService");
const ItemService = require("../service/itemService");

const jsonConfig = require('../../resources/config.json');

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

router.get('/', cache(timeoutCache), async (req, res, next) => {

    let query = req.query.q;

    if (!query) {
        let error = jsonConfig.errors.badRequest;
        res.status(error.statusCode).send({ error: error.message.replace("${param}", "q") });
    }

    let body = await SearchService(req.query.q, res);

    if (!body) {
        let error = jsonConfig.errors.serviceError;
        res.status(error.statusCode).send({ error: error.message });
    }

    let searchResponse = await mapSearch(body, res, next);

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');

    res.send(JSON.stringify(searchResponse));

});

router.get('/:id', cache(timeoutCache), async (req, res, next) => {

    let bodyItem = await ItemService(req.params.id, res);

    if (!bodyItem) {
        let error = jsonConfig.errors.serviceError;
        res.status(error.statusCode).send({ error: error.message });
    }

    let description = await DescriptionService(req.params.id);

    let detailResponse = await mapDetail(bodyItem, description, res, next);

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');

    res.send(JSON.stringify(detailResponse));

});

module.exports = router;
