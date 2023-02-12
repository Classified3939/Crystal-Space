import { reactive } from "vue";
import { Inventory } from "./inventory"
import { AllItems, ItemNames } from "./items/allItems";
import { TradeShop } from "./tradeShop"
import { AllTrades, TradeName } from "./trading/allTrades";

export class GameController {
    static mainInv: Inventory;
    static crystalInv: Inventory;
    static mainTrades: TradeShop;

    constructor() {
        GameController.mainInv = reactive(new Inventory("main"));
        GameController.crystalInv = reactive(new Inventory("crystal"));
        GameController.mainTrades = reactive(new TradeShop("main"));
        this.initialize();
    }

    initialize() {
        GameController.mainTrades.initialize(this);
        GameController.mainInv.addItems(new Array({
            type: AllItems.items[ItemNames.PineWood], amount: 1
        },
            { type: AllItems.items[ItemNames.CopperCoin], amount: 10 }));
        GameController.crystalInv.setItems(new Array({ type: AllItems.items[ItemNames.RedCrystal], amount: 1 }));
        GameController.mainTrades.addTrade(AllTrades.items[TradeName.BuyPine]);
        GameController.mainTrades.addTrade(AllTrades.items[TradeName.SellPine]);
    }
}