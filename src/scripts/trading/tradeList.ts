import { ItemTrade, SellItem, BuyItem } from "./itemTrade";


export class TradeList {
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
        const tradeOutput = new Array({ type: newTrade.outputType, amount: this.getOutput(newTrade) });
        newTrade.exchanger.setItems(newTrade.inputs, tradeOutput)
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
            else if (this.isSelling(trade)) {
                toDisplay = "\t  Sell " + trade.display;
                toDisplay += "\n Gives: " + trade.outputFunction(1) + " " + trade.outputType.display
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
        if (trade.exchanger.canExchange() && trade.progress === 0) {
            trade.progress += 1 / 60;
            trade.exchanger.loseItems();
        }
    }

    updateTrades(dt: DOMHighResTimeStamp) {
        for (const trade of this.availableTrades) {
            if (trade.progress > 0) {
                trade.progress += (dt / 1000);
                if (trade.progress >= this.getTradeTime(trade)) {
                    trade.exchanger.gainItems();
                    trade.progress = 0;
                }
            }
        }
    }

    getTradeTime(trade: ItemTrade): number {
        if (this.isSelling(trade)) return trade.timeToComplete;
        else if (this.isBuying(trade)) return trade.timeFunction(1);
    }

    getOutput(trade: ItemTrade): number {
        if (this.isSelling(trade)) return trade.outputFunction(1);
        else if (this.isBuying(trade)) return trade.outputAmount;
    }

}