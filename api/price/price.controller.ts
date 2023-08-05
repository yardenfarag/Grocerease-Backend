import { Request, Response } from 'express'
import { filterMarketsByRadius } from './price.service'
import { Pos } from '../../models/Pos'
import { Item } from '../../models/item'

export async function getMarketData(req: Request, res: Response) {
  try {
    const pos = req.query.pos as unknown as Pos || { lat: 0, lng: 0 }
    const rad = parseInt(req.query.rad as string) || 10
    const items = req.query.items as unknown as Item[]
    
    const data = await filterMarketsByRadius(pos, rad, items)
    res.json(data)
  } catch (err) {
    res.status(500).send({ err: 'Failed to get market data' })
  }
}
