import { AllItems, ItemNames } from "../items/allItems";
import { ItemExchanger } from "../items/itemExchanger";

export enum TradeName {
    SellWood,
    BuyWood,
    BuyRedCrys,
}

export class AllTrades {
    static trades: object = {
        [TradeName.SellWood]: {
            display: "Wood",
            id: TradeName.SellWood,
            isSelling: true,
            inputs: new Array(
                { type: AllItems.items[ItemNames.Wood], amount: 1 }
            ),
            outputType: AllItems.items[ItemNames.CopperCoin],
            outputFunction: (uses: number): number => {
                return Math.floor((uses - 1) * (10 ** 0.9775) + 10);
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
            inputs: new Array({ type: AllItems.items[ItemNames.CopperCoin], amount: 50 }),
            outputType: AllItems.items[ItemNames.RedCrystal],
            timeFunction: (uses: number): number => {
                return Math.floor((uses - 1) * (0.35 ** 5) + 5);
            },
            outputAmount: 1,
            progress: 0,
            exchanger: new ItemExchanger(),
        },

    }
}