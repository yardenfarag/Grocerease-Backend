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
exports.filterMarketsByRadius = void 0;
const db_service_1 = require("../../services/db.service");
function filterMarketsByRadius(pos, rad, items, collectionName, branchCollectionName) {
    return __awaiter(this, void 0, void 0, function* () {
        const markets = [];
        const allMarketsCollection = yield (0, db_service_1.getCollection)(collectionName);
        const allBranchesCollection = yield (0, db_service_1.getCollection)(branchCollectionName);
        const allBranches = (yield allBranchesCollection.find({}).toArray()).map(mapToBranch);
        for (const branch of allBranches) {
            const distance = getDistance(pos, { lat: branch.lat, lng: branch.lng });
            if (distance <= rad || (branch.lat === 0 && branch.lng === 0)) {
                const marketDoc = yield allMarketsCollection.findOne({ branch_id: branch.branch_id });
                if (marketDoc) {
                    const market = mapToMarket(marketDoc);
                    const branchItems = [];
                    for (const item of items) {
                        const price = findPriceForItem(market, item.barcode);
                        branchItems.push(Object.assign(Object.assign({}, item), { price, totalPrice: +(item.quantity * price).toFixed(2) }));
                    }
                    if (branchItems.length > 0) {
                        const marketInfo = {
                            _id: market._id,
                            loc: market.loc,
                            branch_brand: market.branch_brand,
                            branch_name: market.branch_name,
                            branch_id: market.branch_id,
                            imgUrl: market.imgUrl,
                            timestamp: market.timestamp,
                            items: branchItems,
                        };
                        markets.push(marketInfo);
                    }
                }
            }
        }
        return markets;
    });
}
exports.filterMarketsByRadius = filterMarketsByRadius;
function getDistance(pos1, pos2) {
    const R = 6371; // Earth's radius in kilometers
    const φ1 = (pos1.lat * Math.PI) / 180;
    const φ2 = (pos2.lat * Math.PI) / 180;
    const Δφ = ((pos2.lat - pos1.lat) * Math.PI) / 180;
    const Δλ = ((pos2.lng - pos1.lng) * Math.PI) / 180;
    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
}
function findPriceForItem(market, barcode) {
    if (market.products) {
        for (const product of market.products) {
            if (product.ItemCode === barcode) {
                return parseFloat(product.ItemPrice);
            }
        }
    }
    return 0;
}
function mapToMarket(doc) {
    const { _id, loc, branch_brand, branch_name, branch_id, imgUrl, timestamp, products } = doc;
    return {
        _id: _id.toHexString(),
        loc,
        branch_brand,
        branch_name,
        branch_id,
        imgUrl,
        timestamp,
        products,
    };
}
function mapToBranch(doc) {
    const { _id, branch_brand, branch_name, branch_id, imgUrl, timestamp, lat, lng } = doc;
    return {
        _id: _id.toHexString(),
        branch_brand,
        branch_name,
        branch_id,
        imgUrl,
        timestamp,
        lat,
        lng
    };
}
