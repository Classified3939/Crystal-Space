import { ItemType } from "./allItems";

export interface InventoryItem {
    type: ItemType,
    amount: number,
}