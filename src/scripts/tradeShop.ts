import { ItemTrade, SellItem, BuyItem } from "./trading/itemTrade";
import type { GameController } from "./gameController";
import { initCustomFormatter } from "vue";

export class TradeShop {
    availableTrades: ItemTrade[];
    id: string;
    controller: GameController = null;


    constructor(id: string) {
        this.id = id;
        this.availableTrades = new Array<ItemTrade>();
    }

    initialize(controller: GameController) {
        this.controller = controller;
    }

    addTrade(newTrade: ItemTrade) {
        const checkTrades = this.availableTrades.find(trade => trade.id == newTrade.id);
        if (checkTrades !== undefined) return;
        this.availableTrades.push(newTrade);
    }

    removeTrade(lockedTrade: ItemTrade) {
        const checkTrades = this.availableTrades.find(trade => trade.id == lockedTrade.id);
        if (checkTrades === undefined) return;
        this.availableTrades = this.availableTrades.filter(trade => trade.id !== lockedTrade.id);
    }

    getTrades(): string[] {
        const tradeArray = new Array<string>();
        for (const trade of this.availableTrades) {
            let toDisplay = "";
            if (this.isBuying(trade)) {
                toDisplay = "\t  Buy " + trade.outputAmount + " " + trade.display;
            }
            else {
                toDisplay = "\t  Sell " + trade.display;
            }
            toDisplay += "\n Costs:"
            for (const cost of trade.inputs) {
                toDisplay += (" " + cost.amount + " " + cost.type.display + "\n");
            }
            if (this.isBuying(trade)) {
                toDisplay += " Time: " + trade.timeFunction(1) + " Seconds\n";
            }
            else if (this.isSelling(trade)) {
                toDisplay += " Time: " + trade.timeToComplete + " Seconds\n"
            }

            toDisplay += "\n"

            tradeArray.push(toDisplay)
        }
        return tradeArray;
    }

    isBuying(obj: any): obj is BuyItem {
        return 'outputAmount' in obj;
    }

    isSelling(obj: any): obj is SellItem {
        return 'outputFunction' in obj;
    }

    makeTrade(index: number) {
        const trade = this.availableTrades[index];
        const mainInputs = trade.inputs.filter(i => i.type.invType === "main");
        const crysInputs = trade.inputs.filter(i => i.type.invType === "crystal");


        if (mainInputs.length > 0) {
            if (!this.controller.mainInv.hasItems(mainInputs)) return;
        }
        if (crysInputs.length > 0) {
            if (!this.controller.crystalInv.hasItems(crysInputs)) return;
        }
        if (this.isSelling(trade)) {
            if (trade.outputType.invType == "main") {
                if (!this.controller.mainInv.canAddItem(trade.outputType, trade.outputFunction(1))) return;
                else {
                    this.controller.mainInv.addItems(new Array({ type: trade.outputType, amount: trade.outputFunction(1) }));
                    this.controller.mainInv.loseItems(mainInputs);
                }
            }
            if (trade.outputType.invType == "crystal") {
                if (!this.controller.crystalInv.canAddItem(trade.outputType, trade.outputFunction(1))) return;
                else {
                    this.controller.crystalInv.addItems(new Array({ type: trade.outputType, amount: trade.outputFunction(1) }));
                    this.controller.crystalInv.loseItems(crysInputs);
                }
            }
        }
        else if (this.isBuying(trade)) {
            if (trade.outputType.invType == "main") {
                if (!this.controller.mainInv.canAddItem(trade.outputType, trade.outputAmount)) return;
                else {
                    this.controller.mainInv.addItems(new Array({ type: trade.outputType, amount: trade.outputAmount }));
                    this.controller.mainInv.loseItems(mainInputs);
                }
            }
            if (trade.outputType.invType == "crystal") {
                if (!this.controller.crystalInv.canAddItem(trade.outputType, trade.outputAmount)) return;
                else {
                    this.controller.crystalInv.addItems(new Array({ type: trade.outputType, amount: trade.outputAmount }));
                    this.controller.crystalInv.loseItems(crysInputs);
                }
            }
        }
    }
}