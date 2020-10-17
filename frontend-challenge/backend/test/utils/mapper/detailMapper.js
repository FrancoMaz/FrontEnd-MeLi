import {mapDetailItem, mapDetail} from "../../../src/utils/mapper/detailMapper";

const detailExpected = require('../../resources/expected/detail.json');
const detailMock = require('../../resources/mocks/detail.json');
const descriptionMock = require('../../resources/mocks/description.json');

test('MapDetailItem should return a json of item info to return to the front given the item and description info', async () => {

    const detailItem = await mapDetailItem(detailMock, descriptionMock);

    expect(detailItem).toEqual(detailExpected.item);

});

test('MapDetail should return an object of author, and item', async () => {

    const detailResult = await mapDetail(detailMock, descriptionMock);

    expect(detailResult).toEqual(detailExpected);

});