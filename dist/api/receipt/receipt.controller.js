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
exports.scanReceipt = void 0;
const receipt_service_1 = require("./receipt.service");
function scanReceipt(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const imgUrl = req.body.imgUrl;
            const barcodes = yield (0, receipt_service_1.parseReceipt)(imgUrl);
            const items = [];
            // barcodes?.forEach(b => items.push(getByBarcode(b)))
            console.log('items: ', items);
            res.json(items);
        }
        catch (err) {
            res.status(500).send({ error: 'Failed to process receipt' });
        }
    });
}
exports.scanReceipt = scanReceipt;
