import { Item } from "./item";

export interface MarketItem extends Item {
    price: number;
    discount?: number;
    totalPrice: number;
}