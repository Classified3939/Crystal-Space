import { AllItems, ItemNames } from "../items/allItems";
import { ItemExchanger } from "../items/itemExchanger";

export enum TradeName {
    SellPine,
    BuyPine,
    BuyRedCrys,
}

export class AllTrades {
    static trades: object = {
        [TradeName.SellPine]: {
            display: "Pine Wood",
            id: TradeName.SellPine,
            isSelling: true,
            inputs: new Array(
                { type: AllItems.items[ItemNames.PineWood], amount: 1 }
            ),
            outputType: AllItems.items[ItemNames.CopperCoin],
            outputFunction: (uses: number): number => {
                return Math.floor((uses - 1) * (10 ** 0.9775) + 10);
            },
            timeToComplete: 2,
            progress: 0,
            exchanger: new ItemExchanger(),
        },
        [TradeName.BuyPine]: {
            display: "Pine Wood",
            id: TradeName.BuyPine,
            isSelling: false,
            inputs: new Array({ type: AllItems.items[ItemNames.CopperCoin], amount: 10 }),
            outputType: AllItems.items[ItemNames.PineWood],
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