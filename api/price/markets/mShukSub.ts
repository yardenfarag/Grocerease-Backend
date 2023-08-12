import { Item } from "../../../models/item"
import { Pos } from "../../../models/pos"
import { filterMarketsByRadius } from "../price.service"


export async function getMShukSubMarkets(pos: Pos, rad: number, items: Item[]) {
    const collectionName = 'mShukSub'
    const branchCollectionName = 'mShukSubBranches'
    const markets = await filterMarketsByRadius(pos, rad, items, collectionName, branchCollectionName)
    return markets
}