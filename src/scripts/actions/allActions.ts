import { SimpleEventDispatcher } from "strongly-typed-events";
import { AllItems, ItemNames } from "../items/allItems";
import { ItemExchanger } from "../items/itemExchanger";
import { StatName } from "../stats/statItem";
import { ToolAspects } from "../tools/allTools";
import { ManualAction } from "./manualAction";

export enum ActionName {
    RunErrands,
    ChopWood,
    CarveWood,
}

export class AllActions {
    static actions: Record<ActionName, ManualAction> = {
        [ActionName.RunErrands]: {
            display: "Run Errands",
            id: ActionName.RunErrands,
            inputs: new Array(),
            requiredTool: ToolAspects.None,
            output: { type: AllItems.items[ItemNames.CopperCoin], amount: 5 },
            timeFunction: (effort: number): number => {
                return Math.floor((effort - 1) * (0.35 ** 3) + 5);
            },
            progress: 0,
            onFinish: new SimpleEventDispatcher<ActionName.RunErrands>(),
            exchanger: new ItemExchanger(),
            actionStack: 0,
            relatedStat: null,
        },
        [ActionName.ChopWood]: {
            display: "Chop Trees",
            id: ActionName.ChopWood,
            inputs: new Array(),
            requiredTool: ToolAspects.Axe,
            output: { type: AllItems.items[ItemNames.Wood], amount: 1 },
            timeFunction: (effort: number): number => {
                return Math.floor((effort - 1) * (0.35 ** 5) + 5);
            },
            progress: 0,
            onFinish: new SimpleEventDispatcher<ActionName.ChopWood>(),
            exchanger: new ItemExchanger(),
            actionStack: 0,
            relatedStat: StatName.MaterialsMined,
        },
        [ActionName.CarveWood]: {
            display: "Carve Wood",
            id: ActionName.CarveWood,
            inputs: new Array(
                { type: AllItems.items[ItemNames.Wood], amount: 1 }
            ),
            requiredTool: ToolAspects.Knife,
            output: { type: AllItems.items[ItemNames.WoodenTrinket], amount: 1 },
            timeFunction: (effort: number): number => {
                return Math.floor((effort - 1) * (0.35 ** 5) + 5);
            },
            progress: 0,
            onFinish: new SimpleEventDispatcher<ActionName.CarveWood>(),
            exchanger: new ItemExchanger(),
            actionStack: 0,
            relatedStat: StatName.ItemsCrafted,
        },
    }
}