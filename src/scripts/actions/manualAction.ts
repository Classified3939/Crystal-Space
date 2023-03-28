import { InventoryItem } from "../items/inventoryItem";
import { ISimpleEvent } from "strongly-typed-events";
import { ActionName } from "./allActions";
import { ItemExchanger } from "../items/itemExchanger";
import { ToolAspects } from "../tools/allTools";
import { StatName } from "../stats/statItem";

export interface ManualAction {
    display: string;
    id: ActionName;
    inputs: InventoryItem[];
    requiredTool: ToolAspects;
    output: InventoryItem;
    timeFunction: (effort: number) => number;
    progress: number;
    onFinish: ISimpleEvent<ActionName>;
    exchanger: ItemExchanger;
    actionStack: number;
    relatedStat: StatName | null;
}