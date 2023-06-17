import { Document, ObjectId, WithId } from 'mongodb';
import { getCollection } from '../../services/db.service';
import utilService from '../../services/util.service';
import { Product } from '../../models/product';

export async function query(filterBy: { txt: string } = { txt: '' }) {
    try {
        const criteria = {
            product_name: { $regex: filterBy.txt, $options: 'iu' },
        };
        const collection = await getCollection('product');
        const products = await collection.find(criteria).toArray();
        const mappedProducts: Product[] = products.map((doc:WithId<Document>) => {
            const {_id, product_name, product_id, product_image, product_description, product_barcode, manufacturer_name} = doc
            return {_id: _id.toHexString(), product_name, product_id, product_image, product_description, product_barcode, manufacturer_name}
        })
        return mappedProducts
    } catch (err) {
        throw err
    }
}

