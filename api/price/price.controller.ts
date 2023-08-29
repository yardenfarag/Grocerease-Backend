import { Request, Response } from 'express'
import { Item } from '../../models/item'
import { getMShukMarkets } from './markets/mShuk'
import { getMShukSubMarkets } from './markets/mShukSub'
import { getVictoryMarkets } from './markets/victory'
import { Market } from '../../models/market'
import { Pos } from '../../models/pos'
import { getKey } from './price.service'

export async function getMarketData(req: Request, res: Response) {
  try {
    const pos = req.query.pos as unknown as Pos || { lat: 0, lng: 0 }
    const rad = parseInt(req.query.rad as string) || 10
    const items = req.query.items as unknown as Item[]

    let marketData: Market[] = []
    const mShukMarkets = await getMShukMarkets(pos, rad, items)
    marketData = marketData.concat(mShukMarkets)
    marketData = marketData.concat(await getMShukSubMarkets(pos, rad, items))
    marketData = marketData.concat(await getVictoryMarkets(pos, rad, items))

    res.json(marketData)
  } catch (err) {
    res.status(500).send({ err: 'Failed to get market data' })
  }
}

export async function getKeyValue(req: Request, res: Response) {
  try {
    const keyName = req.query.keyName as string
    const value = getKey(keyName)

    res.json(value)
  } catch (error) {
    res.status(404).send({ err: 'Key not found' })
  }
}
