import { SimpleEventDispatcher } from "strongly-typed-events";
import { AllItems, ItemNames } from "../items/allItems";
import { ItemExchanger } from "../items/itemExchanger";

export enum ActionName {
    RunErrands,
    ChopWood,
    ChopWoodEnergized,
}

export class AllActions {
    static actions: object = {
        [ActionName.RunErrands]: {
            display: "Run Errands",
            id: ActionName.RunErrands,
            inputs: new Array(),
            output: { type: AllItems.items[ItemNames.CopperCoin], amount: 5 },
            effortLevel: 1,
            timeFunction: (effort: number): number => {
                return Math.floor((effort - 1) * (0.35 ** 3) + 5);
            },
            progress: 0,
            onFinish: new SimpleEventDispatcher<ActionName.RunErrands>(),
            exchanger: new ItemExchanger(),
        },
        [ActionName.ChopWood]: {
            display: "Chop Wood",
            id: ActionName.ChopWood,
            inputs: new Array(
                { type: AllItems.items[ItemNames.WoodAxe], amount: 1 }
            ),
            output: { type: AllItems.items[ItemNames.PineWood], amount: 1 },
            effortLevel: 1,
            timeFunction: (effort: number): number => {
                return Math.floor((effort - 1) * (0.35 ** 5) + 5);
            },
            progress: 0,
            onFinish: new SimpleEventDispatcher<ActionName.ChopWood>(),
            exchanger: new ItemExchanger(),
        },
        [ActionName.ChopWoodEnergized]: {
            display: "Quickly Chop Wood",
            id: ActionName.ChopWoodEnergized,
            inputs: new Array(
                { type: AllItems.items[ItemNames.EnergeticWoodAxe], amount: 1 }
            ),
            output: { type: AllItems.items[ItemNames.PineWood], amount: 3 },
            effortLevel: 1,
            timeFunction: (effort: number): number => {
                return Math.floor((effort - 1) * (0.35 ** 2.5) + 2.5);
            },
            progress: 0,
            onFinish: new SimpleEventDispatcher<ActionName.ChopWoodEnergized>(),
            exchanger: new ItemExchanger(),
        },
    }
}