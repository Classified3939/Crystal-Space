import { Inventory } from "./inventory"
import { TradeShop } from "./tradeShop"

export class GameController {
    mainInv = new Inventory("main");
    crystalInv = new Inventory("crystal");
    mainTrades = new TradeShop("main");

    initialize() {
        this.mainTrades.initialize(this);
    }
}