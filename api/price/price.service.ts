import { Item } from "../../models/item"
import { getCollection } from "../../services/db.service"
import { Collection, Document, WithId } from 'mongodb'
import { Branch } from "../../models/branch"
import { Market } from "../../models/market"
import { Pos } from "../../models/pos"

export async function filterMarketsByRadius(pos: Pos, rad: number, items: Item[], collectionName: string, branchCollectionName: string): Promise<Market[]> {
    const markets: Market[] = []
    const allMarketsCollection: Collection<WithId<Document>> = await getCollection(collectionName)
    const allBranchesCollection = await getCollection(branchCollectionName);
    const allBranches = (await allBranchesCollection.find({}).toArray()).map(mapToBranch)
    
    for (const branch of allBranches) {
        
        const distance = getDistance(pos, { lat: branch.lat, lng: branch.lng })
        if (distance <= rad || (branch.lat === 0 && branch.lng === 0)) {

            const marketDoc: WithId<Document> | null = await allMarketsCollection.findOne({branch_id: branch.branch_id})
            if (marketDoc) {
                
                const market: Market = mapToMarket(marketDoc)

                const branchItems: Item[] = []
                for (const item of items) {
                    const price = findPriceForItem(market, item.barcode)


                    branchItems.push({
                        ...item,
                        price,
                        totalPrice: +(item.quantity * price).toFixed(2),
                    })
                }
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
                    }

                    markets.push(marketInfo)
                }
            }
        }
        
    }
    return markets
}

function getDistance(pos1: Pos, pos2: Pos): number {
    const R = 6371 // Earth's radius in kilometers
    const φ1 = (pos1.lat * Math.PI) / 180
    const φ2 = (pos2.lat * Math.PI) / 180
    const Δφ = ((pos2.lat - pos1.lat) * Math.PI) / 180
    const Δλ = ((pos2.lng - pos1.lng) * Math.PI) / 180

    const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    const d = R * c

    return d
}

function findPriceForItem(market: Market, barcode: string): number {
    if (market.products) {
        for (const product of market.products) {
            if (product.ItemCode === barcode) {
                return parseFloat(product.ItemPrice)
            }
        }
    }
    return 0
}

function mapToMarket(doc: WithId<Document>): Market {
    const { _id, loc, branch_brand, branch_name, branch_id, imgUrl, timestamp, products } = doc
    return {
        _id: _id.toHexString(),
        loc,
        branch_brand,
        branch_name,
        branch_id,
        imgUrl,
        timestamp,
        products,
    }
}

function mapToBranch(doc: WithId<Document>): Branch {
    const { _id, branch_brand, branch_name, branch_id, imgUrl, timestamp, lat, lng } = doc
    return {
        _id: _id.toHexString(),
        branch_brand,
        branch_name,
        branch_id,
        imgUrl,
        timestamp,
        lat,
        lng
    }
}


