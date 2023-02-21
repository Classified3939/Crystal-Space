import { AllItems, ItemNames } from "../items/allItems";
import { ItemExchanger } from "../items/itemExchanger";
import { BuyItem, SellItem } from "./itemTrade";

export enum TradeName {
    SellWood,
    BuyWood,
    SellWoodTrinket,
    BuyStone,
    BuyRedCrys,

}

export class AllTrades {
    static trades: Record<TradeName,SellItem|BuyItem> = {
        [TradeName.SellWood]: {
            display: "Wood",
            id: TradeName.SellWood,
            isSelling: true,
            inputs: new Array(
                { type: AllItems.items[ItemNames.Wood], amount: 1 }
            ),
            outputType: AllItems.items[ItemNames.CopperCoin],
            outputFunction: (uses: number): number => {
                return Math.floor((uses - 1) * (8 ** 0.9775) + 8);
            },
            timeToComplete: 2,
            progress: 0,
            exchanger: new ItemExchanger(),
        },
        [TradeName.BuyWood]: {
            display: "Wood",
            id: TradeName.BuyWood,
            isSelling: false,
            inputs: new Array({ type: AllItems.items[ItemNames.CopperCoin], amount: 10 }),
            outputType: AllItems.items[ItemNames.Wood],
            timeFunction: (uses: number): number => {
                return Math.floor((uses - 1) * (0.35 ** 2) + 2);
            },
            outputAmount: 1,
            progress: 0,
            exchanger: new ItemExchanger(),
        },
        [TradeName.BuyRedCrys]: {
            display: "Red Crystal",
            id: TradeName.BuyRedCrys,
            isSelling: false,
            inputs: new Array({ type: AllItems.items[ItemNames.CopperCoin], amount: 75 }),
            outputType: AllItems.items[ItemNames.RedCrystal],
            timeFunction: (uses: number): number => {
                return Math.floor((uses - 1) * (0.35 ** 5) + 5);
            },
            outputAmount: 1,
            progress: 0,
            exchanger: new ItemExchanger(),
        },
        [TradeName.SellWoodTrinket]: {
            display: "Wood Trinket",
            id: TradeName.SellWoodTrinket,
            isSelling: true,
            inputs: new Array(
                { type: AllItems.items[ItemNames.WoodenTrinket], amount: 1 }
            ),
            outputType: AllItems.items[ItemNames.CopperCoin],
            outputFunction: (uses: number): number => {
                return Math.floor((uses - 1) * (15 ** 0.9775) + 15);
            },
            timeToComplete: 2,
            progress: 0,
            exchanger: new ItemExchanger(),
        },
        [TradeName.BuyStone]: {
            display: "Stone",
            id: TradeName.BuyStone,
            isSelling: false,
            inputs: new Array({ type: AllItems.items[ItemNames.CopperCoin], amount: 20 }),
            outputType: AllItems.items[ItemNames.Stone],
            timeFunction: (uses: number): number => {
                return Math.floor((uses - 1) * (0.35 ** 2) + 3);
            },
            outputAmount: 1,
            progress: 0,
            exchanger: new ItemExchanger(),
        },
    }
}