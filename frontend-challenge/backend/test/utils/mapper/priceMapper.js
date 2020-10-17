import {mapPrice} from "../../../src/utils/mapper/priceMapper";
const priceExpected = require('../../resources/expected/price.json');

test('MapPrice should return a json with currency, amount and decimals', async () => {

    const price = await mapPrice(200, "ARS");

    expect(price).toEqual(priceExpected);

});