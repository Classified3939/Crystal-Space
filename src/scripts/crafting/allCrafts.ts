import { SimpleEventDispatcher } from "strongly-typed-events";
import { AllItems, ItemNames } from "../items/allItems"
import { ItemExchanger } from "../items/itemExchanger";
export enum CraftName {
    WoodAxe,
    EnergeticWoodAxe,
}

export class AllCrafts {
    static crafts: object = {
        [CraftName.WoodAxe]: {
            display: "Basic Wood Axe",
            id: CraftName.WoodAxe,
            inputs: new Array(
                { type: AllItems.items[ItemNames.Wood], amount: 2 }
            ),
            output: new Array({ type: AllItems.items[ItemNames.WoodAxe], amount: 1 }),
            effortLevel: 1,
            timeFunction: (effort: number): number => {
                return Math.floor((effort - 1) * (0.35 ** 5) + 5);
            },
            progress: 0,
            onFinish: new SimpleEventDispatcher<CraftName.WoodAxe>(),
            exchanger: new ItemExchanger(),
        },
        [CraftName.EnergeticWoodAxe]: {
            display: "Energetic Wood Axe",
            id: CraftName.EnergeticWoodAxe,
            inputs: new Array(
                { type: AllItems.items[ItemNames.WoodAxe], amount: 3 },
                { type: AllItems.items[ItemNames.RedCrystal], amount: 1 },
            ),
            output: new Array({ type: AllItems.items[ItemNames.EnergeticWoodAxe], amount: 1 }),
            effortLevel: 1,
            timeFunction: (effort: number): number => {
                return Math.floor((effort - 1) * (0.35 ** 7) + 7);
            },
            progress: 0,
            onFinish: new SimpleEventDispatcher<CraftName.EnergeticWoodAxe>(),
            exchanger: new ItemExchanger(),
        },
    }
}