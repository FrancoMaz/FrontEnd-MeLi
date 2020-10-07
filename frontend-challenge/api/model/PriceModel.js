"use strict";

class PriceModel {

    constructor(currency, amount, decimals) {
        this._currency = currency;
        this._amount = amount;
        this._decimals = decimals;
    }

    get currency() {
        return this._currency;
    }

    get amount() {
        return this._amount;
    }

    get decimals() {
        return this._decimals;
    }

    toJson(){
        return {
            currency: this.currency,
            amount: this.amount,
            decimals: this.decimals
        }
    }
}

module.exports = {
    PriceModel: PriceModel
};