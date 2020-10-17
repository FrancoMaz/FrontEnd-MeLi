import {mapSearch, mapResultsItem} from "../../../src/utils/mapper/searchMapper";
const searchExpected = require('../../resources/expected/search.json');
const searchMock = require('../../resources/mocks/search.json');

test('MapResultsItem should return a list of item info to return to the front in the search page given the list of items from service',
    async () => {

    const searchItems = await mapResultsItem(searchMock.results);

    expect(searchItems).toEqual(searchExpected.items);

});

test('MapSearch should return an object of author, categories and items', async () => {

    const searchResult = await mapSearch(searchMock);

    expect(searchResult).toEqual(searchExpected);

});