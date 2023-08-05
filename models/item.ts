export interface Item {
    id?:string
    title:string
    expiry?: string
    quantity:number
    imgUrl?: string
    barcode: string
    place?: string
    price?: number
    totalPrice?: number
}