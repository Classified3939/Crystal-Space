import { ItemType } from "./allItems";
import { InventoryItem } from "./inventoryItem";

export class Inventory {
    items: InventoryItem[];
    id: string;

    constructor(id: string) {
        this.id = id;
        this.items = new Array<InventoryItem>();
    }

    setItems(newItems: InventoryItem[]) {
        this.items = newItems;
    }

    addItems(itemsToAdd: InventoryItem[], multiplier?: number) {
        for (const newItem of itemsToAdd) {
            const currentItem = this.items.find(item => item.type.id === newItem.type.id);
            if (currentItem !== undefined) {
                if (this.canAddItem(currentItem.type, newItem.amount)) {
                    this.increaseItem(currentItem, newItem.amount, multiplier);
                }
            }
            else {
                this.items.push(newItem);
            }
        }
    }

    increaseItem(currentItem: InventoryItem, amount: number, multiplier?: number) {
        if (multiplier === undefined) multiplier = 1;
        const newItem = { type: currentItem.type, amount: currentItem.amount };
        if (currentItem.amount + (amount * multiplier) > currentItem.type.maxAmount) {
            newItem.amount = currentItem.type.maxAmount;
        }
        else {
            newItem.amount += (amount * multiplier);
        }
        this.items.splice(this.items.indexOf(currentItem), 1, newItem)
    }

    canAddItem(currentItem: ItemType, currentAmount: number): boolean {
        return currentAmount < currentItem.maxAmount
    }

    canAddItemList(itemsToAdd: InventoryItem[]) {
        for (const newItem of itemsToAdd) {
            const currentItem = this.items.find(i => i.type.id === newItem.type.id)
            if (currentItem === undefined) continue;
            if (!this.canAddItem(currentItem.type, currentItem.amount)) return false;
        }
        return true;
    }

    hasItems(checkItemList: InventoryItem[]): boolean {
        for (const checkItem of checkItemList) {
            const currentItem = this.items.find(item => item.type.id === checkItem.type.id);
            if (currentItem === undefined || checkItem.amount > currentItem.amount) {
                return false;
            }
        }
        return true;
    }

    loseItems(itemsToLose: InventoryItem[]) {
        if (!this.hasItems(itemsToLose)) return;
        for (const loseItem of itemsToLose) {
            const currentItem = this.items.find(item => item.type.id === loseItem.type.id);
            const newItem = { type: currentItem.type, amount: currentItem.amount };
            newItem.amount -= loseItem.amount;
            this.items.splice(this.items.indexOf(currentItem), 1, newItem);
        }
    }

    getDisplay(): Array<InventoryDisplay> {
        const toDisplay = new Array<InventoryDisplay>();
        for (const item of this.items) {
            let displayItem = item.type.display + " " + item.amount.toString() + "/" + item.type.maxAmount.toString();
            toDisplay.push({ display: displayItem, id: item.type.id + "-" + item.amount });
        }
        return toDisplay;
    }

    load(toLoad: InventoryItem[]) {
        this.items = new Array<InventoryItem>();
        this.addItems(toLoad);
    }
}

export interface InventoryDisplay {
    display: string,
    id: string,
}