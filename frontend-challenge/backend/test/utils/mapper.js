import {
    mapPrice,
    sortCategories,
    mapCategories,
    sortAndMapCategories,
    mapDetailItem,
    mapItem, mapSearch, mapDetail
} from "../../utils/mapper";

test('MapPrice should return a json with currency, amount and decimals', () => {

    let currency = {
        "symbol": "$",
        "currency": "ARS",
        "decimal_places": 2
    };

    let priceJson = {
        "currency": "$",
        "amount": 200,
        "decimals": 2
    };

    expect(mapPrice(200, currency)).toEqual(priceJson);
});

test('SortCategories should sort a list of categories by results', () => {

    let categories = [
        {
            "id": "ML1",
            "title": "Libros",
            "results": 20
        },
        {
            "id": "ML2",
            "title": "Celulares",
            "results": 200
        },
        {
            "id": "ML3",
            "title": "Electrónica",
            "results": 5
        }
    ];

    expect(sortCategories(categories)[0].id).toEqual("ML2");
});

test('MapCategories should return the path of categories given an id', async () => {

    const categories = await mapCategories("MLA412445");

    expect(categories.length).toEqual(2);
    expect(categories[0]).toEqual("Libros, Revistas y Comics");
    expect(categories[1]).toEqual("Libros");

});

test('SortAndMapCategories should return the path of categories of the category with more results', async () => {

    let categories = [
        {
            "id": "ML2",
            "title": "Celulares",
            "results": 200
        },
        {
            "id": "MLA412445",
            "title": "Libros",
            "results": 250
        },
        {
            "id": "ML3",
            "title": "Electrónica",
            "results": 5
        }
    ];

    const pathOfCategories = await sortAndMapCategories(categories);

    expect(pathOfCategories.length).toEqual(2);
    expect(pathOfCategories[0]).toEqual("Libros, Revistas y Comics");
    expect(pathOfCategories[1]).toEqual("Libros");

});

test('MapDetailItem should return a json of item info to return to the front given the item and description info', async () => {

    let item = {
        "id": "ML1",
        "title": "Libro 1",
        "price": 3500,
        "thumbnail": "http://image.jpg",
        "currency_id": "ARS",
        "shipping": {
            "free_shipping": true
        },
        "condition": "new",
        "sold_quantity": 20,
        "category_id": "MLA412445"
    };

    let description = {
        "plain_text": "Este es un libro"
    };

    let detailItemJson = {
        "id": "ML1",
        "title": "Libro 1",
        "price": {
            "currency": "$",
            "amount": 3500,
            "decimals": 2
        },
        "picture": "http://image.jpg",
        "condition": "new",
        "freeShipping": true,
        "soldQuantity": 20,
        "categories": [
            "Libros, Revistas y Comics",
            "Libros"
        ],
        "description": "Este es un libro"
    };

    const detailItem = await mapDetailItem(item, description);

    expect(detailItem).toEqual(detailItemJson);

});

test('MapItem should return a list of item info to return to the front in the search page given the list of items from service', async () => {

    let items = [
        {
            "id": "ML1",
            "title": "Libro 1",
            "price": 3500,
            "thumbnail": "http://image.jpg",
            "currency_id": "ARS",
            "shipping": {
                "free_shipping": true
            },
            "condition": "new",
            "sold_quantity": 20,
            "category_id": "MLA412445"
        },
        {
            "id": "ML2",
            "title": "Libro 2",
            "price": 4500,
            "thumbnail": "http://image2.jpg",
            "currency_id": "ARS",
            "shipping": {
                "free_shipping": true
            },
            "condition": "new",
            "sold_quantity": 5,
            "category_id": "MLA412445"
        }
    ];

    let searchItemsExpected = [
        {
            "id": "ML1",
            "title": "Libro 1",
            "price": {
                "currency": "$",
                "amount": 3500,
                "decimals": 2
            },
            "picture": "http://image.jpg",
            "condition": "new",
            "freeShipping": true
        },
        {
            "id": "ML2",
            "title": "Libro 2",
            "price": {
                "currency": "$",
                "amount": 4500,
                "decimals": 2
            },
            "picture": "http://image2.jpg",
            "condition": "new",
            "freeShipping": true
        }
        ];

    const searchItems = await mapItem(items);

    expect(searchItems).toEqual(searchItemsExpected);

});

test('MapSearch should return an object of author, categories and items', async () => {

    let search = {
        "available_filters": [
            {
                "name": "categories",
                "values": [
                    {
                        "id": "ML2",
                        "title": "Celulares",
                        "results": 200
                    },
                    {
                        "id": "MLA412445",
                        "title": "Libros",
                        "results": 250
                    },
                    {
                        "id": "ML3",
                        "title": "Electrónica",
                        "results": 5
                    }
                ]
            }

        ],
        "results": [
            {
                "id": "ML1",
                "title": "Libro 1",
                "price": 3500,
                "thumbnail": "http://image.jpg",
                "currency_id": "ARS",
                "shipping": {
                    "free_shipping": true
                },
                "condition": "new",
                "sold_quantity": 20,
                "category_id": "MLA412445"
            },
            {
                "id": "ML2",
                "title": "Libro 2",
                "price": 4500,
                "thumbnail": "http://image2.jpg",
                "currency_id": "ARS",
                "shipping": {
                    "free_shipping": true
                },
                "condition": "new",
                "sold_quantity": 5,
                "category_id": "MLA412445"
            }
            ]
    };

    let searchModel = {
        "author": {
            "name": "Franco",
            "lastname": "Mazzoni"
        },
        "categories": [
            "Libros, Revistas y Comics",
            "Libros"
        ],
        "items": [
            {
                "id": "ML1",
                "title": "Libro 1",
                "price": {
                    "currency": "$",
                    "amount": 3500,
                    "decimals": 2
                },
                "picture": "http://image.jpg",
                "condition": "new",
                "freeShipping": true
            },
            {
                "id": "ML2",
                "title": "Libro 2",
                "price": {
                    "currency": "$",
                    "amount": 4500,
                    "decimals": 2
                },
                "picture": "http://image2.jpg",
                "condition": "new",
                "freeShipping": true
            }
        ]
    };

    const searchResult = await mapSearch(search);

    expect(searchResult).toEqual(searchModel);

});

test('MapDetail should return an object of author, and item', async () => {

    let item = {
        "id": "ML1",
        "title": "Libro 1",
        "price": 3500,
        "thumbnail": "http://image.jpg",
        "currency_id": "ARS",
        "shipping": {
            "free_shipping": true
        },
        "condition": "new",
        "sold_quantity": 20,
        "category_id": "MLA412445"
    };

    let description = {
        "plain_text": "Este es un libro"
    };

    let detail = {
        "author": {
            "name": "Franco",
            "lastname": "Mazzoni"
        },
        "item": {
            "id": "ML1",
            "title": "Libro 1",
            "price": {
                "currency": "$",
                "amount": 3500,
                "decimals": 2
            },
            "picture": "http://image.jpg",
            "condition": "new",
            "freeShipping": true,
            "soldQuantity": 20,
            "categories": [
                "Libros, Revistas y Comics",
                "Libros"
            ],
            "description": "Este es un libro"
        }
    };

    const detailResult = await mapDetail(item, description);

    expect(detailResult).toEqual(detail);

});