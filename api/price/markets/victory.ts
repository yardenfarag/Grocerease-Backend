import { Item } from "../../../models/item"
import { Pos } from "../../../models/pos"
import { filterMarketsByRadius } from "../price.service"


export async function getVictoryMarkets(pos: Pos, rad: number, items: Item[]) {
    const collectionName = 'victory'
    const branchCollectionName = 'victoryBranches'
    const markets = await filterMarketsByRadius(pos, rad, items, collectionName, branchCollectionName)
    return markets
}