import { ItemCollection } from "../ItemCollection";

export class PlayerInventory {
    inventory: ItemCollection
    id = "MainInv"

    constructor() {
        this.inventory = new ItemCollection("PlayerItems")
    }
}