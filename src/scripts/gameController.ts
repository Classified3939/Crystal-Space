import { nextTick, reactive, ref } from "vue";
import { Inventory } from "./inventory"
import { AllItems, ItemNames } from "./items/allItems";
import { TradeShop } from "./tradeShop"
import { AllTrades, TradeName } from "./trading/allTrades";
import loop from 'raf-loop';
import { CraftActions } from "./craftActions";
import { AllCrafts, CraftName } from "./crafting/allCrafts";

export class GameController {
    static mainInv: Inventory;
    static crystalInv: Inventory;
    static mainTrades: TradeShop;
    static mainCrafts: CraftActions;
    static engine: loop

    constructor() {
        GameController.mainInv = reactive(new Inventory("main"));
        GameController.crystalInv = reactive(new Inventory("crystal"));
        GameController.mainTrades = reactive(new TradeShop("main"));
        GameController.mainCrafts = reactive(new CraftActions("main"));
        this.initialize();
    }

    initialize() {
        GameController.mainInv.addItems(new Array(
            { type: AllItems.items[ItemNames.CopperCoin], amount: 20 }));
        GameController.crystalInv.setItems(new Array({ type: AllItems.items[ItemNames.RedCrystal], amount: 1 }));
        GameController.mainTrades.addTrade(AllTrades.trades[TradeName.BuyPine]);
        GameController.mainTrades.addTrade(AllTrades.trades[TradeName.SellPine]);
        GameController.mainTrades.addTrade(AllTrades.trades[TradeName.BuyRedCrys]);
        GameController.mainCrafts.addcraft(AllCrafts.crafts[CraftName.WoodAxe]);
        GameController.mainCrafts.addcraft(AllCrafts.crafts[CraftName.EnergeticWoodAxe]);
        GameController.engine = loop((dt) => {
            GameController.mainTrades.updateTrades(dt);
            GameController.mainCrafts.updateCrafts(dt);
        }).start();
    }
}