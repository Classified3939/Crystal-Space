import { InventoryItem } from "../items/inventoryItem";
import { SimpleEventDispatcher } from "strongly-typed-events";
import { CraftName } from "./allCrafts";

export interface ItemCraft {
    display: string;
    id: CraftName;
    inputs: InventoryItem[];
    output: InventoryItem;
    effortLevel: number;
    timeFunction: (effort: number) => number;
    progress: number;
    onFinish: SimpleEventDispatcher<CraftName>;
}