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

//Se usa memCache para cachear las respuestas de las apis. Por default se agregó un timeout de caché de 10 segs
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

//Endpoint de search dada una query (por query param)
router.get('/', cache(timeoutCache), async (req, res, next) => {

    let query = req.query.q;

    //Si no viene el param q, entonces devuelvo un 400
    if (!query) {
        let error = jsonConfig.errors.badRequest;
        res.status(error.statusCode).send({ error: error.message.replace("${param}", "q") });
    }

    //Traigo la respuesta del servicio de search
    let body = await SearchService(req.query.q, res);

    //Si no viene la respuesta (y no se lanza error en SearchService) manejo el error desde acá
    if (!body) {
        let error = jsonConfig.errors.serviceError;
        res.status(error.statusCode).send({ error: error.message });
    }

    //Mappeo la respuesta del servicio de search
    let searchResponse = await mapSearch(body, res, next);

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');

    res.send(JSON.stringify(searchResponse));

});

//Endpoint de detalle de un ítem dado un id (por path variable)
router.get('/:id', cache(timeoutCache), async (req, res, next) => {

    //Traigo la respuesta del servicio de ítems
    let bodyItem = await ItemService(req.params.id, res);

    //Si no viene la respuesta (y no se lanza error en ItemService) manejo el error desde acá
    if (!bodyItem) {
        let error = jsonConfig.errors.serviceError;
        res.status(error.statusCode).send({ error: error.message });
    }

    //Traigo la respuesta del servicio de descripción (si no viene directamente devuelvo ese campo vacío, después manejo ese caso desde el front)
    let description = await DescriptionService(req.params.id);

    //Mappeo la respuesta del servicio de ítems
    let detailResponse = await mapDetail(bodyItem, description, res, next);

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');

    res.send(JSON.stringify(detailResponse));

});

module.exports = router;
