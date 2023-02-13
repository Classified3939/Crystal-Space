import { InventoryItem } from "../items/inventoryItem";
import { ISimpleEvent } from "strongly-typed-events";
import { ActionName } from "./allActions";
import { ItemExchanger } from "../items/itemExchanger";

export interface ManualAction {
    display: string;
    id: ActionName;
    inputs: InventoryItem[];
    output: InventoryItem;
    timeFunction: (effort: number) => number;
    progress: number;
    onFinish: ISimpleEvent<ActionName>;
    exchanger: ItemExchanger;
}