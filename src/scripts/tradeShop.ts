import { ItemTrade, SellItem, BuyItem } from "./trading/itemTrade";
import { GameController } from "./GameController"


export class TradeShop {
    availableTrades: ItemTrade[];
    id: string;


    constructor(id: string) {
        this.id = id;
        this.availableTrades = new Array<ItemTrade>();
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
            if (!GameController.mainInv.hasItems(mainInputs)) return;
        }
        if (crysInputs.length > 0) {
            if (!GameController.crystalInv.hasItems(crysInputs)) return;
        }
        if (this.isSelling(trade)) {
            if (trade.outputType.invType == "main") {
                if (!GameController.mainInv.canAddItem(trade.outputType, trade.outputFunction(1))) return;
                else {
                    trade.progress += 1 / 60;
                }
            }
            if (trade.outputType.invType == "crystal") {
                if (!GameController.crystalInv.canAddItem(trade.outputType, trade.outputFunction(1))) return;
                else {
                    trade.progress += 1 / 60;
                }
            }
        }
        else if (this.isBuying(trade)) {
            if (trade.outputType.invType == "main") {
                if (!GameController.mainInv.canAddItem(trade.outputType, trade.outputAmount)) return;
                else {
                    trade.progress += 1 / 60;
                }
            }
            if (trade.outputType.invType == "crystal") {
                if (!GameController.crystalInv.canAddItem(trade.outputType, trade.outputAmount)) return;
                else {
                    trade.progress += 1 / 60;
                }
            }
        }
    }

    exchangeItems(trade: ItemTrade) {
        const mainInputs = trade.inputs.filter(i => i.type.invType === "main");
        const crysInputs = trade.inputs.filter(i => i.type.invType === "crystal");

        GameController.mainInv.loseItems(mainInputs);
        GameController.crystalInv.loseItems(crysInputs);
        const outputToMain = trade.outputType.invType === "main";
        if (this.isBuying(trade)) {
            if (outputToMain) {
                GameController.mainInv.addItems(new Array({ type: trade.outputType, amount: trade.outputAmount }))
            }
            else {
                GameController.crystalInv.addItems(new Array({ type: trade.outputType, amount: trade.outputAmount }))
            }
        }
        else if (this.isSelling(trade)) {
            if (outputToMain) {
                GameController.mainInv.addItems(new Array({ type: trade.outputType, amount: trade.outputFunction(1) }));
            }
            else {
                GameController.crystalInv.addItems(new Array({ type: trade.outputType, amount: trade.outputFunction(1) }));
            }
        }
    }

    updateTrades(dt: DOMHighResTimeStamp) {
        for (const trade of this.availableTrades) {
            if (trade.progress > 0) {
                trade.progress += (dt / 1000);
                if (trade.progress >= this.getTradeTime(trade)) {
                    this.exchangeItems(trade);
                    trade.progress = 0;
                }
            }
        }
    }

    getTradeTime(trade: ItemTrade): number {
        if (this.isSelling(trade)) return trade.timeToComplete;
        if (this.isBuying(trade)) return trade.timeFunction(1);
    }

}