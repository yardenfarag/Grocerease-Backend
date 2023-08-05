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
exports.getByBarcode = exports.query = void 0;
const db_service_1 = require("../../services/db.service");
function query(filterBy = { txt: '' }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const criteria = {
                product_name: { $regex: filterBy.txt, $options: 'iu' },
            };
            const collection = yield (0, db_service_1.getCollection)('product');
            const products = yield collection.find(criteria).toArray();
            const mappedProducts = products.map((doc) => {
                const { _id, product_name, product_id, product_image, product_description, product_barcode, manufacturer_name } = doc;
                return { _id: _id.toHexString(), product_name, product_id, product_image, product_description, product_barcode, manufacturer_name };
            });
            return mappedProducts;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.query = query;
function getByBarcode(barcode) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const collection = yield (0, db_service_1.getCollection)('product');
            const product = yield collection.findOne({ product_barcode: barcode });
            if (product) {
                const { _id, product_name, product_image, product_barcode, product_description, manufacturer_name } = product;
                return { _id: _id.toHexString(), product_name, product_image, product_barcode, product_description, manufacturer_name };
            }
            return product;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.getByBarcode = getByBarcode;
