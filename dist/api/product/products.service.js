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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.add = exports.getByBarcode = exports.query = void 0;
const db_service_1 = require("../../services/db.service");
const axios_1 = __importDefault(require("axios"));
function query(filterBy = { txt: '' }, page) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const criteria = {
                product_name: { $regex: filterBy.txt, $options: 'iu' },
            };
            const sortOptions = ['product_name', 1];
            const query = {};
            let itemsPerPage = 24;
            if (process.env.ITEMS_PER_PAGE) {
                itemsPerPage = +process.env.ITEMS_PER_PAGE;
            }
            const skipAmount = (page - 1) * itemsPerPage;
            const collection = yield (0, db_service_1.getCollection)('product');
            const count = yield collection.countDocuments(criteria);
            let products = [];
            products = yield collection.find(criteria).sort(sortOptions).skip(skipAmount).limit(itemsPerPage).toArray();
            const pageCount = count / itemsPerPage;
            const mappedProducts = products.map((doc) => {
                const { _id, product_name, brand_name, product_image, product_description, product_barcode } = doc;
                return { _id: _id.toHexString(), product_name, brand_name, product_image, product_description, product_barcode };
            });
            return {
                pagination: {
                    count,
                    pageCount: Math.ceil(pageCount)
                },
                products: mappedProducts
            };
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
            const collection = yield (0, db_service_1.getCollection)('gs1');
            const product = yield collection.findOne({ 'product_info.Main_Fields.GTIN': barcode });
            return product;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.getByBarcode = getByBarcode;
function add(barcode, imgUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const url = `http://fe.gs1-retailer.mk101.signature-it.com/external/product/${barcode}.json?hq=1`;
            const username = process.env.GS1_USERNAME;
            const password = process.env.GS1_PASSWORD;
            const authHeader = `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`;
            const res = yield axios_1.default.get(url, {
                headers: {
                    Authorization: authHeader
                }
            });
            const gs1Product = Object.assign(Object.assign({}, res.data[0]), { imgUrl });
            const gs1Collection = yield (0, db_service_1.getCollection)('gs1');
            yield gs1Collection.insertOne(gs1Product);
            const productsCollection = yield (0, db_service_1.getCollection)('product');
            const product = {
                product_name: gs1Product.product_info.Main_Fields.Trade_Item_Description,
                product_image: gs1Product.imgUrl,
                product_description: gs1Product.product_info.Main_Fields.internal_product_description,
                product_barcode: gs1Product.product_info.Main_Fields.GTIN,
                brand_name: gs1Product.product_info.Main_Fields.BrandName
            };
            yield productsCollection.insertOne(product);
            return gs1Product;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.add = add;
