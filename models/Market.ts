import { MarketItem } from "./MarketItem"

export interface Market {
    id: string
    retail_name: string
    branch_name: string
    imgUrl?: string
    items: MarketItem[]
}