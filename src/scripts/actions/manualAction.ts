import { InventoryItem } from "../items/inventoryItem";
import { ISimpleEvent } from "strongly-typed-events";
import { ActionName } from "./allActions";
import { ItemExchanger } from "../items/itemExchanger";
import { ToolType } from "../tools/toolItem";

export interface ManualAction {
    display: string;
    id: ActionName;
    inputs: InventoryItem[];
    requiredTool: ToolType;
    output: InventoryItem;
    timeFunction: (effort: number) => number;
    progress: number;
    onFinish: ISimpleEvent<ActionName>;
    exchanger: ItemExchanger;
}