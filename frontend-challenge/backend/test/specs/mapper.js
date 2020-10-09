import { mapPrice } from "../../utils/mapper";

define([ 'unit/mapPrice' ], function ( ) {
    describe("mapPrice()", () => {

        let currency = {
            "symbol": "$",
            "currency": "AR$",
            "decimals": 2
        };

        let priceJson = {
            "currency": "$",
            "amount": 200,
            "decimals": 2
        };

        it("", () => {
            expect(mapPrice(200, currency)).toEqual(priceJson);
        });
    });
});