import { AbstractItem } from "./AbstractItem";

export class ItemCollection {
    items: Map<string, number>
    id: string

    constructor(id: string) {
        this.id = id
        this.items = new Map<string, number>();
    }

    setItems(newItems: Map<string, number>) {
        this.items = newItems
    }

    addItem(newItem: AbstractItem, amount: number) {
        const currentItem = this.items.get(newItem.id)
        if (currentItem !== undefined) {
            this.items.set(newItem.id, currentItem + amount)
        }
        else {
            this.items.set(newItem.id, amount)
        }
    }

    hasItem(checkItem: AbstractItem, amount: number): boolean {
        const currentItem = this.items.get(checkItem.id)
        return (currentItem !== undefined && currentItem >= amount)
    }

    removeItem(loseItem: AbstractItem, amount: number) {
        if (!this.hasItem(loseItem, amount)) return
        const currentItem = this.items.get(loseItem.id)
        this.items.set(loseItem.id, currentItem + amount)
    }
}