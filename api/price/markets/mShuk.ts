import { Item } from "../../../models/item"
import { Pos } from "../../../models/pos"
import { filterMarketsByRadius } from "../price.service"


export async function getMShukMarkets(pos: Pos, rad: number, items: Item[]) {
    const collectionName = 'mShuk'
    const branchCollectionName = 'mShukBranches'
    const markets = await filterMarketsByRadius(pos, rad, items, collectionName, branchCollectionName)
    return markets
}