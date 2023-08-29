import { Request, Response } from 'express'
import { parseReceipt } from './receipt.service'
import { getByBarcode } from '../product/products.service'
import { WithId, Document } from 'mongodb'


export async function scanReceipt(req: Request, res: Response) {
    try {
        const imgUrl = req.body.imgUrl as string

        const barcodes = await parseReceipt(imgUrl)
        const items: Promise<WithId<Document> | null>[] = []

        // barcodes?.forEach(b => items.push(getByBarcode(b)))
        console.log('items: ', items);
        

        res.json(items)
    } catch (err) {
        res.status(500).send({ error: 'Failed to process receipt' })
    }
}