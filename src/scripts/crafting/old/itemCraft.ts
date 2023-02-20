import { InventoryItem } from "../../items/inventoryItem";
import { ISimpleEvent } from "strongly-typed-events";
import { CraftName } from "./allCrafts";
import { ItemExchanger } from "../../items/itemExchanger";

export interface ItemCraft {
    display: string;
    id: CraftName;
    inputs: InventoryItem[];
    output: InventoryItem[];
    effortLevel: number;
    timeFunction: (effort: number) => number;
    progress: number;
    onFinish: ISimpleEvent<CraftName>;
    exchanger: ItemExchanger;
}