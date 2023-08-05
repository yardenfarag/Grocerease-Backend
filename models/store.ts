import { Place } from "./place"
import { Grocery } from "./grocery"
import { Item } from "./item"

export interface Store {
    _id?: string
    title:string
    color:string
    shoppingList: Grocery[]
    userIds: string[]
    items?: Item[]
}