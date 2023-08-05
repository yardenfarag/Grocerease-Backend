"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMarketData = void 0;
const price_service_1 = require("./price.service");
function getMarketData(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pos = req.query.pos || { lat: 0, lng: 0 };
            const rad = parseInt(req.query.rad) || 10;
            const items = req.query.items;
            const data = yield (0, price_service_1.filterMarketsByRadius)(pos, rad, items);
            res.json(data);
        }
        catch (err) {
            res.status(500).send({ err: 'Failed to get market data' });
        }
    });
}
exports.getMarketData = getMarketData;
