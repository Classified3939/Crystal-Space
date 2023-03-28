import { ItemType } from "../items/allItems";
import { InventoryItem } from "../items/inventoryItem";
import { ItemExchanger } from "../items/itemExchanger";
import { StatName } from "../stats/statItem";
import { TradeName } from "./allTrades"

export interface ItemTrade {
    display: string;
    id: TradeName;
    isSelling: boolean;
    inputs: InventoryItem[];
    outputType: ItemType;
    progress: number;
    exchanger: ItemExchanger;
    relatedStat: StatName;
}

export interface SellItem extends ItemTrade {
    outputFunction: (uses: number) => number;
    timeToComplete: number;
}

export interface BuyItem extends ItemTrade {
    timeFunction: (uses: number) => number;
    outputAmount: number
}