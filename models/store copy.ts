import { Place } from "./place"
import { Grocery } from "./grocery"

export interface Store {
    _id?: string
    title:string
    color:string
    places: Place[]
    shoppingList: Grocery[]
    userIds: string[]
}