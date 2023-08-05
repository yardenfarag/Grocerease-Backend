import { Item } from "../../models/item";
import { getCollection } from "../../services/db.service";
import { convertXmlToJson, downloadFile } from "../../services/xml.service";
import { Collection, Document, WithId } from 'mongodb'; // Import the appropriate MongoDB types

import fs from 'fs';

interface Position {
    lat: number;
    lng: number;
}

interface Market {
    _id: string;
    loc: { type: string, coordinates: [number, number] }
    branch_brand: string;
    branch_name: string;
    branch_id: string;
    imgUrl: string;
    timestamp: string;
    items?: Item[]
    products?: Array<{
        PriceUpdateDate: string;
        ItemCode: string;
        ItemType: string;
        ItemName: string;
        ManufactureName: string;
        ManufactureCountry: string;
        ManufactureItemDescription: string;
        UnitQty: string;
        Quantity: string;
        UnitMeasure: string;
        BisWeighted: string;
        QtyInPackage: string;
        ItemPrice: string;
        UnitOfMeasurePrice: string;
        AllowDiscount: string;
        itemStatus: string;
        LastUpdateDate: string;
        LastUpdateTime: string;
    }>;
}

interface Branch {
    _id: string
    branch_brand: string;
    branch_name: string;
    branch_id: string;
    imgUrl: string;
    timestamp: string;
    lat: number
    lng: number
}

function mapToMarket(doc: WithId<Document>): Market {
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

function mapToBranch(doc: WithId<Document>): Branch {
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

export async function filterMarketsByRadius(pos: Position, rad: number, items: Item[]): Promise<Market[]> {
    console.log('good luck')
    const markets: Market[] = [];
    const allMarketsCollection: Collection<WithId<Document>> = await getCollection('mShuk');
    const allBranchesCollection = await getCollection('mShukBranches');
    const allBranches = (await allBranchesCollection.find({}).toArray()).map(mapToBranch)
    console.log('got branches')
    for (const branch of allBranches) {
        const distance = getDistance(pos, { lat: branch.lat, lng: branch.lng })
        if (distance <= rad || (branch.lat === 0 && branch.lng === 0)) {
            console.log('branch id: ' + branch.branch_id);
            
            const criteria = { branch_id: {$eq: branch.branch_id} }
            console.log('criteria');
            const marketsInRadius: Market[] = (await allMarketsCollection.find(criteria).toArray()).map(mapToMarket);
            console.log('got markets', marketsInRadius)
            for (const market of marketsInRadius) {
                console.log('got here');
                const branchItems: Item[] = [];
                for (const item of items) {
                    const price = findPriceForItem(market, item.barcode);
                    
                    // if (price > 0) {
                        branchItems.push({
                            ...item,
                            price,
                            totalPrice: +(item.quantity * price).toFixed(2),
                        });
                    // }
                    if (branchItems.length > 0) {
                        const marketInfo: Market = {
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
    }
    return markets; 
}

function getDistance(pos1: Position, pos2: Position): number {
    const R = 6371; // Earth's radius in kilometers
    const φ1 = (pos1.lat * Math.PI) / 180;
    const φ2 = (pos2.lat * Math.PI) / 180;
    const Δφ = ((pos2.lat - pos1.lat) * Math.PI) / 180;
    const Δλ = ((pos2.lng - pos1.lng) * Math.PI) / 180;

    const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c;

    return d;
}

function findPriceForItem(market: Market, barcode: string): number {
    if (market.products) {
        for (const product of market.products) {
            if (product.ItemCode === barcode) {
                console.log('price:' + product.ItemPrice)
                return parseFloat(product.ItemPrice);
            }
        }
    }
    return 0;
}




