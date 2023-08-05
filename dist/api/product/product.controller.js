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
exports.getProductByBarcode = exports.getProducts = void 0;
const products_service_1 = require("./products.service");
function getProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const filterBy = {
                txt: req.query.txt || '',
            };
            const products = yield (0, products_service_1.query)(filterBy);
            res.json(products);
        }
        catch (err) {
            res.status(500).send({ err: 'Failed to get products' });
        }
    });
}
exports.getProducts = getProducts;
function getProductByBarcode(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const barcode = req.params.barcode;
            const product = yield (0, products_service_1.getByBarcode)(barcode);
            res.json(product);
        }
        catch (err) {
            res.status(500).send({ err: 'Failed to get product' });
        }
    });
}
exports.getProductByBarcode = getProductByBarcode;
