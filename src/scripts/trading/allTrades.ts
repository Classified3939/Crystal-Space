import { AllItems, ItemNames } from "../items/allItems";

export enum TradeName {
    SellPine,
    BuyPine,
    SellRedCrys,
    BuyRedCrys,
}

export class AllTrades {
    static items: object = {
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
        }
    }
}