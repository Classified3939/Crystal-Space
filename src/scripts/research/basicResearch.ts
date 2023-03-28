import { InventoryItem } from "../items/inventoryItem";
import { ItemExchanger } from "../items/itemExchanger";
import { BasicResearchName } from "./allResearch";

export interface BasicResearch {
    name: BasicResearchName,
    inputs: InventoryItem[];
    toComplete: number;
    progress: number;
    onResearch: () => void;
    exchanger: ItemExchanger;
}